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

Meteor.startup(function(){
    Tracker.autorun(function(){
        $.validator.addMethod("usernameUnique", function(value, element) {
            Meteor.call("checkUniqueUser", value, function(e,r){
                Session.set("usernameUnique",r);
            });
            return Session.get("usernameUnique");
        }, TAPi18n.__("error.username_error_duplicated"));

        $.validator.addMethod("emailUnique", function(value, element) {
            Meteor.call("checkUniqueEmail", value, function(e,r){
                Session.set("emailUnique",r);
            });
            return Session.get("emailUnique");
        }, TAPi18n.__("error.email_error_duplicated"));

        $.validator.addMethod("coincidencePassword", function(value, element) {
            var password_register = document.getElementById('password_register').value;
            var confirmpassword = document.getElementById('confirmpassword').value;
            var coindicende = true;
            if(password_register != confirmpassword){
                coindicende = false;
            }
            return coindicende;
        }, TAPi18n.__("error.password_error_coincidence"));

        $.validator.addMethod("emailPattern", function(value, element){
            return /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/.test(value);
        }, TAPi18n.__("error.email_error_patron"));

        $.validator.addMethod("passwordPattern", function(value, element){
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value);
        }, TAPi18n.__("error.password_error_pattern"));
    })
});

Template.register.onRendered(function(){
    if(sessionStorage.getItem("usernameHome")!="undefined"){
        $('#username').val(sessionStorage.getItem("usernameHome"))
    }
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
                emailUnique: true,
                emailPattern: true
            },
            password_register: {
                required: true,
                minlength: 8,
                maxlength: 20,
                passwordPattern: true
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
                maxlength: TAPi18n.__("error.username_error_maxlength")
            },
            email: {
                required: TAPi18n.__("error.email_error_empty")
            },
            password_register: {
                required: TAPi18n.__("error.password_error_empty"),
                minlength: TAPi18n.__("error.password_error_minlength"),
                maxlength: TAPi18n.__("error.password_error_maxlength")
            },
            confirmpassword: {
                required: TAPi18n.__("error.confirmpassword_error_empty"),
                minlength: TAPi18n.__("error.password_error_minlength"),
                maxlength: TAPi18n.__("error.password_error_maxlength")
            }
        }
    });
});