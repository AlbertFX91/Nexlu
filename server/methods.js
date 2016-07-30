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
                        followed: [],
                        private_profile: user[4]
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
    "image.new": function(data) {
        var user = Meteor.user();
        if (user != undefined) {
            var image = {
                owner:
                    {
                        id: user._id,
                        username: user.username
                    },
                createdAt: new Date(),
                playersTagged: [], //TODO: Añadir etiquetas
                description: data.description,
                playersLike: [],
                playersDislike: [],
                comments: [],
                url: data.url
            };
            var id = Images.insert(image);

            var playersTagged = Meteor.call('constructPlayersTagged', data.usernameTagged);
            Images.update(id, {
                $set: {
                    playersTagged: playersTagged
                }
            })

        } else {
            throw Meteor.Error("User not logued");
        }
    },
    'image.edit': function(publicationId, description, usernamesTagged){
        var playersTagged = Meteor.call('constructPlayersTagged', usernamesTagged);
        Images.update(publicationId, {
            $set: {
                description: description,
                playersTagged: playersTagged
            }
        })
    },
    'image.remove': function(publicationId) {
        Images.remove(publicationId);
    },
    'image.like': function(publicationId) {
        var userId = Meteor.userId();
        Images.update(publicationId, {
            $push: {
                playersLike: userId
            }
        });
        Images.update(publicationId, {
            $pull: {
                playersDislike: userId
            }
        })
    },
    'image.dislike': function(publicationId) {
        var userId = Meteor.userId();
        Images.update(publicationId, {
            $push: {
                playersDislike: userId
            }
        });
        Images.update(publicationId, {
            $pull: {
                playersLike: userId
            }
        })
    },
    'image.remove.like': function(publicationId) {
        var userId = Meteor.userId();
        Images.update(publicationId, {
            $pull: {
                playersLike: userId
            }
        })
    },
    'image.remove.dislike': function(publicationId) {
        var userId = Meteor.userId();
        Images.update(publicationId, {
            $pull: {
                playersDislike: userId
            }
        })
    },
    'getUsernameById': function(id){
        var user = Meteor.users.findOne(id, {fields:{username:1}});
        return user.username;
    },
    'editPublication': function(publicationId, description, usernamesTagged){
        var playersTagged = Meteor.call('constructPlayersTagged', usernamesTagged);
        Publications.update(publicationId, {
            $set: {
                description: description,
                playersTagged: playersTagged
            }
        })
    },
    'removePublication': function(publicationId) {
        Publications.remove(publicationId);
    },
    'postPublication': function (publication, usernamesTagged) {
        var publicationId = Publications.insert(publication, function (err, response) {
            if (err) {
                console.log(err);
            }
        })
        var playersTagged = Meteor.call('constructPlayersTagged', usernamesTagged);
        Publications.update(publicationId, {
            $set: {
                playersTagged: playersTagged
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
    'constructPlayersTagged': function(usernamesTagged) {
        var usernameLength = usernamesTagged.length;
        var playersTagged = [];
        for (var i = 0; i < usernameLength; i++){
            var id = Meteor.users.findOne({"username": usernamesTagged[i]}, {fields:{_id:1}});
            playersTagged.push({
                _id: id,
                username: usernamesTagged[i]
            })
        }
        return playersTagged;
    },
    'likePublication': function(publicationId) {
        var userId = Meteor.userId();
        Publications.update(publicationId, {
            $push: {
                playersLike: userId
            }
        });
        Publications.update(publicationId, {
            $pull: {
                playersDislike: userId
            }
        })
    },
    'dislikePublication': function(publicationId) {
        var userId = Meteor.userId();
        Publications.update(publicationId, {
            $push: {
                playersDislike: userId
            }
        });
        Publications.update(publicationId, {
            $pull: {
                playersLike: userId
            }
        })
    },
    'removeLikePublication': function(publicationId) {
        var userId = Meteor.userId();
        Publications.update(publicationId, {
            $pull: {
                playersLike: userId
            }
        })
    },
    'removeDislikePublication': function(publicationId) {
        var userId = Meteor.userId();
        Publications.update(publicationId, {
            $pull: {
                playersDislike: userId
            }
        })
    }, 
    'image.postComment': function (publicationId, comment) {
        Images.update(publicationId, {
            $push: {
                comments: comment
            }
        });
    },
    'postComment': function (publicationId, comment) {
        Publications.update(publicationId, {
            $push: {
                comments: comment
            }
        });
    },
    'image.likeComment': function(commentId) {
        var userId = Meteor.userId();
        Images.update({"comments.id": commentId}, {
            $push: {
                "comments.$.playersLike": userId
            }
        });
        Images.update({"comments.id": commentId}, {
            $pull: {
                "comments.$.playersDislike": userId
            }
        })
    },
    'likeComment': function(commentId) {
        var userId = Meteor.userId();
        Publications.update({"comments.id": commentId}, {
            $push: {
                "comments.$.playersLike": userId
            }
        });
        Publications.update({"comments.id": commentId}, {
            $pull: {
                "comments.$.playersDislike": userId
            }
        })
    },
    'image.dislikeComment': function(commentId) {
        var userId = Meteor.userId();
        Images.update({"comments.id": commentId}, {
            $push: {
                "comments.$.playersDislike": userId
            }
        });
        Images.update({"comments.id": commentId}, {
            $pull: {
                "comments.$.playersLike": userId
            }
        })
    },
    'dislikeComment': function(commentId) {
        var userId = Meteor.userId();
        Publications.update({"comments.id": commentId}, {
            $push: {
                "comments.$.playersDislike": userId
            }
        });
        Publications.update({"comments.id": commentId}, {
            $pull: {
                "comments.$.playersLike": userId
            }
        })
    },
    'image.removeLikeComment': function(commentId) {
        var userId = Meteor.userId();
        Images.update({"comments.id": commentId}, {
            $pull: {
                "comments.$.playersLike": userId
            }
        })
    },
    'removeLikeComment': function(commentId) {
        var userId = Meteor.userId();
        Publications.update({"comments.id": commentId}, {
            $pull: {
                "comments.$.playersLike": userId
            }
        })
    },
    'image.removeDislikeComment': function(commentId) {
        var userId = Meteor.userId();
        Images.update({"comments.id": commentId}, {
            $pull: {
                "comments.$.playersDislike": userId
            }
        })
    },
    'removeDislikeComment': function(commentId) {
        var userId = Meteor.userId();
        Publications.update({"comments.id": commentId}, {
            $pull: {
                "comments.$.playersDislike": userId
            }
        })
    },
    'image.editComment': function(commentId, description){
        Images.update({"comments.id": commentId}, {
            $set: {
                "comments.$.description": description
            }
        })
    },
    'editComment': function(commentId, description){
        Publications.update({"comments.id": commentId}, {
            $set: {
                "comments.$.description": description
            }
        })
    },
    'image.removeComment': function(commentId) {
        Images.update({"comments.id": commentId}, {
            $pull: {
                comments: {
                    id: commentId
                }
            }
        });
    },
    'removeComment': function(commentId) {
        Publications.update({"comments.id": commentId}, {
            $pull: {
                comments: {
                    id: commentId
                }
            }
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
    },
    'login.facebook': function(){
        var user = Meteor.user();
        options = {
            username : user.profile.name.replace(/ /g,''),
            email: user.services.facebook.email
        };
        Meteor.users.update(user._id, {
            $set: {
                username: options.username.toLowerCase(),
                "emails.0.address": options.email,
                bio: TAPi18n.__("bio.add_bio"),
                followers: [],
                followed: [],
                "emails.0.verified": true
            }
        });
    },
    'login.google': function(){
        var user = Meteor.user();
        options = {
            username : user.profile.name.replace(/ /g,''),
            email: user.services.google.email
        };
        Meteor.users.update(user._id, {
            $set: {
                username: options.username.toLowerCase(),
                "emails.0.address": options.email,
                bio: TAPi18n.__("bio.add_bio"),
                followers: [],
                followed: [],
                "emails.0.verified": true
            }
        });
    },
    'login.facebook.newUsername': function(username){
        var user = Meteor.user();
        options = {
            username : username.replace(/ /g,''),
            email: user.services.facebook.email
        };
        Meteor.users.update(user._id, {
            $set: {
                username: options.username.toLowerCase(),
                "emails.0.address": options.email,
                bio: TAPi18n.__("bio.add_bio"),
                followers: [],
                followed: [],
                "emails.0.verified": true,
                private_profile: false
            }
        });
    },
    'login.google.newUsername': function(){
        var user = Meteor.user();
        options = {
            username : user.profile.name.replace(/ /g,''),
            email: user.services.facebook.email
        };
        Meteor.users.update(user._id, {
            $set: {
                username: options.username.toLowerCase(),
                "emails.0.address": options.email,
                bio: TAPi18n.__("bio.add_bio"),
                followers: [],
                followed: [],
                "emails.0.verified": true,
                private_profile: false
            }
        });
    },
    'find.privacity': function(){
        var user = Meteor.user();
        return user.private_profile;
    },
    'changePrivacity': function (accepted) {
        var userId = Meteor.userId();
        Meteor.users.update(userId, {
            $set: {
                private_profile: accepted
            }
        });
    },
    'find.privacity.byUser': function (username) {
        var user = Meteor.users.findOne({"username": username});
        return user.private_profile;
    },
    'find.is.followed': function (username) {
        var userProfile = Meteor.users.findOne({"username": username});
        var user = Meteor.user();
        var result = false;
        userProfile.followers.forEach(function (item) {
            if (item == user._id) {
                result = true;
            }
        });
        return result;
},

    'findAvatarByUser': function(user_id){
        var user = Meteor.users.findOne(user_id);
        if(user){
            if(user.avatar == undefined){
                return "https://s3-us-west-2.amazonaws.com/nexlu/logo-justified.png";
            }else{
                return user.avatar.url;
            }
        }else{
            throw new Meteor.Error( 500, 'User does not exist with id: '+user_id );
        }
    },

    'setAvatar': function(publication_id){
        var user = Meteor.user();
        if(!user){
            throw new Meteor.Error( 500, 'We cannot recover the user logged');
            return false;
        }
        var image = Images.findOne(publication_id);
        if(!image){
            throw new Meteor.Error( 500, 'We cannot recover the publication with id '+publication_id);
            return false;
        }
        if(image.owner.id!=user._id){
            throw new Meteor.Error( 500, 'The owner of the publication is not the current user');
            return false;
        }
        Meteor.users.update(user._id, {
            $set: {
                avatar:{
                    id: image._id,
                    url: image.url
                }
            }
        });
        return true;
    }
});