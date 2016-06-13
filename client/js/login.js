Template.login.events({
    'submit #login-form': function(event){
        event.preventDefault();
        var usernameval = $("#username").val();
        var passwordval = $("#password").val();
        if(usernameval!="" && passwordval!=""){
            Meteor.loginWithPassword(usernameval, passwordval, function(err){
                if(err){
                    Errors.throwErrorTranslated("error.login_credentials_wrong");
                }else{
                    Toasts.throwTrans("toast.login_success");
                    Router.go('home');
                }
            });
        }else{
            Errors.throwErrorTranslated("error.login_credentials_wrong");
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
            if(err){
                Errors.throwErrorTranslated("error.login_credentials-facebook_wrong");
            }else{
                Toasts.throwTrans("toast.login_success");
                Router.go('home');
            }
        });
    },
    'click #google-login': function(event) {
        Meteor.loginWithGoogle ({}, function(err){
            if(err){
                Errors.throwErrorTranslated("error.login_credentials-google_wrong");
            }else{
                Toasts.throwTrans("toast.login_success");
                Router.go('home');
            }
        });
    },
    'click #twitter-login': function(event) {
        Meteor.loginWithTwitter ({}, function(err){
            if(err){
                Errors.throwErrorTranslated("error.login_credentials-twitter_wrong");
            }else{
                Toasts.throwTrans("toast.login_success");
                Router.go('home');
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

Template.login.helpers({
    'hasErrors': function(){
        return Session.get("alert") != null;
    },
    'alert': function(){
        return Session.get("alert");
    }
});
