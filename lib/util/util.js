Util = {

    validate_password: function (password_register, confirmpassword){
        var result = true;
        if(password_register != confirmpassword){
            result = false;
        }
        re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if(!re.test(password_register)){
            result = false;
        }
        if(confirmpassword == ""){
            result = false;
        }
        if(password_register == ""){
            result = false;
        }
        return result;
    },

    validate_email: function (emailRegister){
        var result = true;
        var emailDB = Meteor.users.findOne({'emails.address': emailRegister});
        if(!((typeof emailDB) == 'undefined')){
            result = false;
        }
        if(emailRegister == ""){
            result = false;
        }
        return result;
    },

    validate_username: function(usernameRegister){
        var result = true;
        var usernameBD = Meteor.users.findOne({username:usernameRegister});
        if(!((typeof usernameBD) == 'undefined')){
            result = false;
        }
        if(usernameRegister == ""){
            result = false;
        }
        return result;
    },
};