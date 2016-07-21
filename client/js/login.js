Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var usernameval = event.target.username.value;
        var passwordval = event.target.password.value;
        if(usernameval!="" && passwordval){
            Meteor.loginWithPassword(usernameval, passwordval, function(err){
                if(err){
                    Errors.throwErrorTranslated("error.login_credentials_wrong");
                }else{
                    Toasts.throwTrans("toast.login_success");
                    $('#login-access').removeClass('login-open').addClass('login-close');
                    setTimeout(function(){ Session.set('showLoginModal', false); }, 300);
                }
            });
        }else{
            Errors.throwErrorTranslated("error.login_credentials_wrong");
        }
    },
    'click #login-overlay': function(event){
        Session.set('showLoginModal', false);
        Session.set('alert', null);
    },
    'click #login-main': function(event){
        if(event.target.id==="login-main"){
            Session.set('showLoginModal', false);
            Session.set('alert', null);
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


Template.login.onRendered(function(){
    $('#login-access').addClass('login-open');
    $('#login-overlay').css('display', 'block');
    $('#login-main').css('display', 'block');
    $('#login-access').css('display', 'block');

    $('#login-content').delay(150).slideDown("slow");
});