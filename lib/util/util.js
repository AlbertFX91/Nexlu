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
    },
    //SOURCE: http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata y adaptado a Meteor
    dataURItoFile: function(img) {
        var dataURI = img.resultEdited;
        if(dataURI == undefined) dataURI = img.result;
        var type = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new File([new Uint8Array(array)], img.name, {type: type});
    }

};