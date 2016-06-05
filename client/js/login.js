Template.login.events({
    'submit #login-form': function(event){
        event.preventDefault();
        var usernameval = $("#username").val();
        var passwordval = $("#password").val();
        if(usernameval!="" && passwordval!=""){
            Meteor.loginWithPassword(usernameval, passwordval, function(err){
                if(err){
                    throwErrorTranslated("login_error_credentials_wrong");
                }else{
                    Router.go('home');
                }
            });
        }else{
            throwErrorTranslated("login_error_credentials_wrong");
        }
    },
});
