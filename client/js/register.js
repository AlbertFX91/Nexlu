Template.register.events({
    'submit .register-form': function (event) {
        event.preventDefault();
        var username = document.getElementById('username').value;
        var password_register = document.getElementById('password_register').value;
        var confirmpassword = document.getElementById('confirmpassword').value;
        var private_profile = document.getElementById('private_checkbox').checked;
        var email = document.getElementById('email').value;
        var user = [username, password_register, email, confirmpassword, private_profile];
        Meteor.call("user_create", user);
        Session.set("user", user);
        Router.go('thanks_register');
    }
});

$.validator.addMethod("usernameUnique", function() {
    var usernameRegister = document.getElementById('username').value;
    Meteor.call("checkUniqueUser", usernameRegister, function(e,r){
        Session.set("usernameUnique",r);
    });
    return Session.get("usernameUnique");
});

$.validator.addMethod("emailUnique", function() {
    var emailRegister = document.getElementById('email').value;
    Meteor.call("checkUniqueEmail", emailRegister, function(e,r){
        Session.set("emailUnique",r);
    });
    return Session.get("emailUnique");
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
    $('.tooltipped').tooltip({delay: 50});
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
                emailUnique: true
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
                emailUnique: TAPi18n.__("error.email_error_duplicated"),
            },
            password_register: {
                required: TAPi18n.__("error.password_error_empty"),
                minlength: TAPi18n.__("error.password_error_minlength"),
                maxlength: TAPi18n.__("error.password_error_maxlength"),
                pattern: TAPi18n.__("error.password_error_pattern"),
            },
            confirmpassword: {
                required: TAPi18n.__("error.confirmpassword_error_empty"),
                minlength: TAPi18n.__("error.password_error_minlength"),
                maxlength: TAPi18n.__("error.password_error_maxlength"),
                pattern: TAPi18n.__("error.password_error_pattern"),
                coincidencePassword: TAPi18n.__("error.password_error_coincidence")
            }
        }
    });
});

Template.register.helpers({

});