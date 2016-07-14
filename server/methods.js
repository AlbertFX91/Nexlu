Meteor.methods({
    'user_create':function (user) {
        var username_no_errors = Util.validate_username(user[0]);
        var password_no_errors = Util.validate_password(user[1], user[3]);
        var email_no_errors = Util.validate_email(user[2]);
        if(username_no_errors == true  && email_no_errors == true && password_no_errors == true){
            try {
                userId = Accounts.createUser({
                    username: user[0],
                    password: user[1],
                    email: user[2]
                });
                Meteor.users.update(userId, {
                    $set: {
                        bio: TAPi18n.__("bio.add_bio"),
                        followers: [],
                        followed: []
                    }
                });
            } catch (error) {
                throw new Meteor.Error("Server error", error);
            }
            Accounts.sendVerificationEmail(userId);
        }
    },
    'modify_bio': function(bio){
        if(bio == ""){
            bio = TAPi18n.__(" ");
        }
        var userId = Meteor.userId();
        Meteor.users.update(userId, {
            $set: {
                bio: bio
            }
        });
    },
    'send_email_verification': function(user){
        var userDB = Meteor.users.findOne({'username': user[0]});
        Accounts.sendVerificationEmail(userDB._id);
    },

    'checkUniqueUser': function(usernameRegister){
        return Meteor.users.find({'username': usernameRegister}).fetch().length==0
    },

    'checkUniqueEmail': function(emailRegister){
        return Meteor.users.find({'emails.0.address': emailRegister}).fetch().length==0
    },
    'deCodificaString': function (codificado) {
        var decodedString = Base64.decode(codificado);
        return decodedString;
    },
    'getUsernameById': function(id){
        var user = Meteor.users.findOne(id, {fields:{username:1}});
        return user.username;
    },
    'editPublication': function(publicationId, description){
        Publications.update(publicationId, {
            $set: {
                description: description
            }
        })
    },
    'removePublication': function(publicationId) {
        Publications.remove(publicationId);
    },
    'postPublication': function (publication) {
        Publications.insert(publication, function (err, response) {
            if (err) {
                console.log(err);
            }
        })
    },
    'send_message_about': function(info) {
        Email.send({
            to: "infonexlu@gmail.com",
            from: info[0],
            subject: info[0],
            text: info[1] + "\n\n" + info[2]
        });
    },
    'chatroom.exists': function(follower_id, my_id){
        var res = ChatRooms.findOne(
            {$and:
                [
                    {"players.id": follower_id},
                    {"players.id": my_id}
                ]
            }
        );
        if (res == undefined){
            return undefined;
        }else{
            return res._id;
        }
    },
    'chatroom.new': function(follower_id, my_id){
        var follower_username = Meteor.users.findOne(follower_id).username;
        var my_username = Meteor.users.findOne(my_id).username;
        return ChatRooms.insert({
            players: [
                {
                    id: follower_id,
                    username: follower_username
                },
                {
                    id: my_id,
                    username: my_username
                }
            ],
            messages: []
        });
    },
    'chatroom.send': function(chatroom_id, messageToSend) {
        if (messageToSend.length == 0) return false;
        var userId = Meteor.userId();
        var createdAt = new Date();
        ChatRooms.update(chatroom_id, {
            $push: {
                messages: {
                    createdAt: createdAt,
                    message: messageToSend,
                    player: userId
                }
            }
        });
        return true;
    },
    'findUsers': function(){
        var user = Meteor.user();
        var result = [];
        user.followed.forEach(function(item){
            var userFollowed = Meteor.users.findOne({"_id": item});
            var aux = {
                "username": userFollowed.username,
                "bio": userFollowed.bio,
                //TODO: "image": userFollowed.image
            };
            result.push(aux);
        });
        return result;
    },
    'findFollowing': function(usernameProfile, userProfile) {
        var user = null;
        if (userProfile) {
            user = Meteor.users.findOne({"username": usernameProfile});
        } else {
            user = Meteor.user();
        }
        var result = [];
        user.followed.forEach(function(item){
            var userFollowed = Meteor.users.findOne({"_id": item});
            var aux = {
                "username": userFollowed.username,
                "bio": userFollowed.bio,
                //TODO: "image": userFollowed.image
            };
            result.push(aux);
        });
        return result;
    },
    'findFollowers': function(usernameProfile, userProfile){
        var user = null;
        if(userProfile){
            user = Meteor.users.findOne({"username":usernameProfile});
        }else{
            user = Meteor.user();
        }
        var result = [];
        user.followers.forEach(function(item){
            var userFollower = Meteor.users.findOne({"_id": item});
            var aux = {
                "username": userFollower.username,
                "bio": userFollower.bio,
                //TODO: "image": userFollowed.image
            };
            result.push(aux);
        });
        return result;
    },
    'findNumPublications': function(usernameProfile){
        var user = Meteor.users.findOne({"username":usernameProfile});
        return Publications.find({"owner.0.id": user._id}, {fields: Fields.publication.none}).fetch().length;
    },
    'unfollow': function(username){
        var userId = Meteor.userId();
        var userUnfollow = Meteor.users.findOne({"username":username});
        Meteor.users.update({_id: userId}, {
            "$pull": {
                followed: userUnfollow._id
            }
        });
        Meteor.users.update({_id: userUnfollow._id}, {
            "$pull": {
                followers: userId
            }

        });
    }
});