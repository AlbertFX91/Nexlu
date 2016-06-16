Meteor.subscribe('allUsers');

Template.register.events({
    'click .continue': function(event){
        event.preventDefault();
        var username = document.getElementById('username').value;
        var password_register = document.getElementById('password_register').value;
        var confirmpassword = document.getElementById('confirmpassword').value;
        var email = document.getElementById('email').value;
        var email_no_errors = validate_email(email);
        var username_no_errors = validate_username(username);
        var password_no_errors = validate_password(password_register, confirmpassword);
        Session.set("validate", false);
        if (username_no_errors == true  && email_no_errors == true && password_no_errors == true) {
            Session.set("validate", true);
            var user = [username, password_register, email];
            Session.set("user", user);
            $('#data_register').css('display', 'none');
            $('#data_register').css('visibility', 'hidden');
            $('.div_form_more').css('display', 'block');
            $('.div_form_more').css('visibility', 'visible');
        }
    },
    'click .finish': function (event) {
        event.preventDefault();
        var description = document.getElementById('textarea1').value;
        if (Session.get("validate")){
            var user = Session.get("user");
            user[3] = description;
            Accounts.createUser({
                username: user[0],
                password: user[1],
                email: user[2],
                image: null,
                description: user[3],
                friends: null
            });
            Router.go('thanks_register');
        }else {
            Session.set('alert', "wrongs");
        }
    },
    disabled: function(){
        return "disabled";
    }
});

Template.register.onRendered(function(){
});

Template.register.helpers({

});


function validate_password(password_register, confirmpassword){
    var result = true;
    if(password_register != confirmpassword){
        Session.set("error_password_coincidence", throwErrorTranslated("error.password_error_coincidence", 3000));
        result = false;
    }
    if(confirmpassword == ""){
        Session.set("error_confirmpassword", throwErrorTranslated("error.confirmpassword_error_empty", 3000));
        result = false;
    }
    if(password_register == ""){
        Session.set("error_password", throwErrorTranslated("error.password_error_empty", 3000));
        result = false;
    }
    re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if(!re.test(password_register)){
        Session.set("error_password_patron", throwErrorTranslated("error.password_error_patron", 3000));
        result = false;
    }
    return result;
}

function validate_email(emailRegister){
    var result = true;
    var emailDB = Meteor.users.findOne({'emails.address': emailRegister});
    if(!((typeof emailDB) == 'undefined')){
        Session.set("error_email_duplicated", throwErrorTranslated("error.email_error_duplicated", 3000));
        result = false;
    }
    if(emailRegister == ""){
        Session.set("error_email_empty", throwErrorTranslated("error.email_error_empty", 3000));
        result = false;
    }
    re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if(!re.test(emailRegister)){
        Session.set("error_email_patron", throwErrorTranslated("error.email_error_patron", 3000));
        result = false;
    }
    return result;
}

function validate_username(usernameRegister){
    var result = true;
    var usernameBD = Meteor.users.findOne({username:usernameRegister});
    if(!((typeof usernameBD) == 'undefined')){
        Session.set("error_username_duplicated", throwErrorTranslated("error.username_error_duplicated", 3000));
        result = false;
    }
    if(usernameRegister == ""){
        Session.set("error_username", throwErrorTranslated("error.username_error_empty", 3000));
        result = false;
    }
    return result;
}