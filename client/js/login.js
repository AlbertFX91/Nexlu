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
    'click #twitter-login': function(event) {
        Meteor.loginWithTwitter ({}, function(err){
            if (err) {
                throw new Meteor.Error("Twitter login failed");
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
            appId: '552878074884212',
            secret: '34ce8f878c155cb9dc839fcf7397e7c8'
        });

        ServiceConfiguration.configurations.insert({
            service: "google"
        });

        ServiceConfiguration.configurations.insert({
            service: "google",
            clientId: "761927564374-umhq0tua7577ttp8757t677aks1i99b7.apps.googleusercontent.com",
            secret: "edPJyzYT1_K_XZ5eR7BaGsCr",
            loginStyle: "popup"
        });
        ServiceConfiguration.configurations.insert({
            service: "twitter"
        });

        ServiceConfiguration.configurations.insert({
            service: "twitter",
            consumerKey: "WHvxoAhHb7bKczbqwvOv3xBf8",
            loginStyle: "popup",
            secret: "bgEQGKpaDg3RsBqvkoZhtSQ70lk0PyJjWVpdyv5kkD8R566YZ6"
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