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
                        bio: "",
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
        var userDB = Meteor.users.find({'username': usernameRegister});
        var result = true;
        if(typeof userDB == 'undefined'){
            result = false;
        }
        return result;
    },

    'checkUniqueEmail': function(emailRegister){
        var userDB = Meteor.users.find({'emails.address': emailRegister});
        var result = true;
        if(typeof userDB == 'undefined'){
            result = false;
        }
        return result;
    }
});