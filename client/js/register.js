Template.register.events({
    'submit .register-form': function (event) {
        event.preventDefault();
        var username = document.getElementById('username').value;
        var password_register = document.getElementById('password_register').value;
        var confirmpassword = document.getElementById('confirmpassword').value;
        var email = document.getElementById('email').value;
        var user = [username, password_register, email, confirmpassword];
        Meteor.call("user_create", user);
        Session.set("user", user);
        Router.go('thanks_register');
    }
});

$.validator.addMethod("usernameUnique", function() {
    var usernameRegister = document.getElementById('username').value;
    var result = "ard";
    Meteor.call("checkUniqueUser", usernameRegister, function(e,r){
        Session.set("usernameUnique",r);
    });
    var result = Session.get("usernameUnique");
    return result;
});

$.validator.addMethod("emailUnique", function() {
    var emailRegister = document.getElementById('email').value;
    var result = Meteor.call("checkUniqueEmail", emailRegister);
    return result;
});

$.validator.addMethod("coincidencePassword", function() {
    var password_register = document.getElementById('password_register').value;
    var confirmpassword = document.getElementById('confirmpassword').value;
    var coindicende = true;
    if(password_register != confirmpassword){
        coindicende = false;
    }
    return coindicende;
});

Template.register.onRendered(function(){
    var paco =  TAPi18n.__("error.username_error_empty")
    console.log(paco);
    $( "#register_form" ).validate({
        rules: {
            username: {
                required: true,
                minlength: 2,
                maxlength: 15,
                usernameUnique: true
            },
            email: {
                required: true,
                //emailUnique: true
            },
            password_register: {
                required: true,
                minlength: 8,
                maxlength: 20,
            },
            confirmpassword: {
                required: true,
                minlength: 8,
                maxlength: 20,
                coincidencePassword: true
            }
        },
        messages: {
            username: {
                required: TAPi18n.__("error.username_error_empty"),
                minlength: TAPi18n.__("error.username_error_minlength"),
                maxlength: TAPi18n.__("error.username_error_maxlength"),
                usernameUnique: TAPi18n.__("error.username_error_duplicated")
            },
            email: {
                required: TAPi18n.__("error.email_error_empty"),
                //emailUnique: TAPi18n.__("error.email_error_duplicated"),
            },
            password_register: {
                required: TAPi18n.__("error.password_error_empty"),
                minlength: TAPi18n.__("error.password_error_minlength"),
                maxlength: TAPi18n.__("error.password_error_maxlength"),
                pattern: TAPi18n.__("error.password_error_patron")
            },
            confirmpassword: {
                required: TAPi18n.__("error.confirmpassword_error_empty"),
                minlength: TAPi18n.__("error.password_error_minlength"),
                maxlength: TAPi18n.__("error.password_error_maxlength"),
                pattern: TAPi18n.__("error.password_error_patron"),
                coincidencePassword: TAPi18n.__("error.password_error_coincidence")
            }
        }
    });
});

Template.register.helpers({

});