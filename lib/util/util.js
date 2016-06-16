Util = {

    validate_password: function (password_register, confirmpassword){
        var result = true;
        if(password_register != confirmpassword){
            Errors.throwErrorTranslated("error.password_error_coincidence", 3000);
            result = false;
        }
        if(confirmpassword == ""){
            Errors.throwErrorTranslated("error.confirmpassword_error_empty", 3000);
            result = false;
        }
        if(password_register == ""){
            Errors.throwErrorTranslated("error.password_error_empty", 3000);
            result = false;
        }
        re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if(!re.test(password_register)){
            Errors.throwErrorTranslated("error.password_error_patron", 3000);
            result = false;
        }
        return result;
    },

    validate_email: function (emailRegister){
        var result = true;
        var emailDB = Meteor.users.findOne({'emails.address': emailRegister});
        if(!((typeof emailDB) == 'undefined')){
            Errors.throwErrorTranslated("error.email_error_duplicated", 3000);
            result = false;
        }
        if(emailRegister == ""){
            Errors.throwErrorTranslated("error.email_error_empty", 3000);
            result = false;
        }
        re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
        if(!re.test(emailRegister)){
            Errors.throwErrorTranslated("error.email_error_patron", 3000);
            result = false;
        }
        return result;
    },

    validate_username: function(usernameRegister){
        var result = true;
        var usernameBD = Meteor.users.findOne({username:usernameRegister});
        if(!((typeof usernameBD) == 'undefined')){
            Errors.throwErrorTranslated("error.username_error_duplicated", 3000);
            result = false;
        }
        if(usernameRegister == ""){
            Errors.throwErrorTranslated("error.username_error_empty", 3000);
            result = false;
        }
        return result;
    }
};