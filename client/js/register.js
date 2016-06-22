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

Template.register.onRendered(function(){
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
            password: {
                required: true,
                minlength: 8,
                maxlength: 15
            },
            confirmpassword: {
                required: true,
                minlength: 8,
                maxlength: 15
            }
        },
        messages: {
            username: {
                required: TAPi18n.__("error.username_error_empty"),
                minlength: TAPi18n.__("error.username_minlength"),
                maxlength: TAPi18n.__("error.username_maxlength"),
                usernameUnique: TAPi18n.__("error.username_error_duplicated")
            },
            email: {
                required: TAPi18n.__("error.email_error_empty"),
                emailUnique: TAPi18n.__("error.email_error_duplicated")
            },
            password: {
                required: TAPi18n.__("error.password_error_empty"),
                minlength: TAPi18n.__("error.password_minlength"),
                maxlength: TAPi18n.__("error.password_maxlength")
            },
            confirmpassword: {
                required: TAPi18n.__("error.confirmpassword_error_empty"),
                minlength: TAPi18n.__("error.confirmpassword_minlength"),
                maxlength: TAPi18n.__("error.confirmpassword_maxlength")
            }
        }
    });
});

$.validator.addMethod("usernameUnique", function(username) {
    var exists = Meteor.users.findOne( { "username": username }, { fields: { "username": 1 } } );
    return exists ? false : true;
});

$.validator.addMethod("emailUnique", function(email) {
    var exists = Meteor.users.findOne( { "emails.address": email }, { fields: { "username": 1 } } );
    return exists ? false : true;
});

Template.register.helpers({

});