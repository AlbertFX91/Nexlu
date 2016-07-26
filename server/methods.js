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
    'postComment': function (publicationId, comment) {
        Publications.update(publicationId, {
            $push: {
                comments: comment
            }
        });
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
    }
});