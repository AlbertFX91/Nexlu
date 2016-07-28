Template.new_username.events({
    'submit .login-form-newUsername': function(event){
        if(sessionStorage.getItem("login-facebook")){
            Meteor.loginWithFacebook({}, function(err){
                if(err){
                    Errors.throwErrorTranslated("error.login_credentials-facebook_wrong");
                }else{
                    Toasts.throwTrans("toast.login_success");
                    $('#login-access').removeClass('login-open').addClass('login-close');
                    setTimeout(function(){ Session.set('showLoginModal', false); }, 300);
                    var newUsername = document.getElementById("newUsername").value;
                    Meteor.call("login.facebook.newUsername", newUsername);
                }
            });
            Router.go("home");
        }
        if(sessionStorage.getItem("login-google")){
            Meteor.loginWithGoogle({}, function(err){
                if(err){
                    Errors.throwErrorTranslated("error.login_credentials-facebook_wrong");
                }else{
                    Toasts.throwTrans("toast.login_success");
                    $('#login-access').removeClass('login-open').addClass('login-close');
                    setTimeout(function(){ Session.set('showLoginModal', false); }, 300);
                    var newUsername = document.getElementById("newUsername").value;
                    Meteor.call("login.google.newUsername", newUsername);
                }
            });
            Router.go("home");
        }
    }
});