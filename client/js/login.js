Template.login.events({
    'click #login-buttom': function(event){
        event.preventDefault();
        var usernameval = $("#username").val();
        var passwordval = $("#password").val();
        if(usernameval!="" && passwordval){
            Meteor.loginWithPassword(usernameval, passwordval, function(err){
                if(err){
                    Session.set('alert', "login_error_credentials_wrong");
                    $("#error-container").css("display","inline");
                }else{
                    Session.set('alert', null);
                    Router.go('home');
                }
            });
        }else{
             Session.set('alert', "login_error_credentials_wrong");
             $("#error-container").css("display","inline");
        }
    },
    'click #close-error': function(event){
        $error_container = $("#error-container");
        if($error_container.css("display") == "inline"){
            $error_container.css("display", "none");
        }

    },
    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                throw new Meteor.Error("Facebook login failed");
            }
        });
    },
    'click #google-login': function(event) {
        Meteor.loginWithGoogle ({}, function(err){
            if (err) {
                throw new Meteor.Error("Google login failed");
            }
        });
    },
    'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    }
});

Template.login.onRendered(function () {
        ServiceConfiguration.configurations.remove({
            service: 'facebook'
        });

        ServiceConfiguration.configurations.insert({
            service: 'facebook',
            appId: '12345678901234567890',
            secret: 'secret12345678901234567890'
        });

        ServiceConfiguration.configurations.insert({
            service: "google"
        });

        ServiceConfiguration.configurations.insert({
            service: "google",
            clientId: "761927564374-umhq0tua7577ttp8757t677aks1i99b7.apps.googleusercontent.com",
            secret: "nvWWuwqnNZziIOn7fADAUlbl"
        });
    }
);



Template.login.helpers({
    'hasErrors': function(){
        return Session.get("alert") != null;
    },
    'alert': function(){
        return Session.get("alert");
    }
});