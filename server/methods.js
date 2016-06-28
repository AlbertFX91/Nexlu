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
    'deCodificaString': function (codificado) {
        var decodedString = Base64.decode(codificado);
        return decodedString;
    },
    'send_message_about': function(info) {
        Email.send({
            to: "infonexlu@gmail.com",
            from: TAPi18n.__("from") + info[1],
            subject: TAPi18n.__("subject") + info[0],
            text: TAPi18n.__("from") + info[1] + "\n\n" + info[2]
        });
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