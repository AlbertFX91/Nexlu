Util = {

    validate_password: function (password_register, confirmpassword){
        var result = true;
        if(password_register != confirmpassword){
            Session.set("password_coincidence","error.password_error_coincidence");
            result = false;
        }
        re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if(!re.test(password_register)){
            Session.set("password_pattern","error.password_error_patron");
            result = false;
        }
        if(confirmpassword == ""){
            Session.set("confirmpassword_empty","error.confirmpassword_error_empty");
            result = false;
        }
        if(password_register == ""){
            Session.set("password_empty","error.password_error_empty");
            result = false;
        }
        return result;
    },

    validate_email: function (emailRegister){
        var result = true;
        var emailDB = Meteor.users.findOne({'emails.address': emailRegister});
        re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        if(!re.test(emailRegister)){
            Session.set("email_pattern","error.email_error_patron");
            result = false;
        }
        if(!((typeof emailDB) == 'undefined')){
            Session.set("email_duplicated","error.email_error_duplicated");
            result = false;
        }
        if(emailRegister == ""){
            Session.set("email_empty","error.email_error_empty");
            result = false;
        }
        return result;
    },

    validate_username: function(usernameRegister){
        var result = true;
        var usernameBD = Meteor.users.findOne({username:usernameRegister});
        if(!((typeof usernameBD) == 'undefined')){
            Session.set("username_duplicated","error.username_error_duplicated");
            result = false;
        }
        if(usernameRegister == ""){
            Session.set("username_empty","error.username_error_empty");
            result = false;
        }
        return result;
    },
};