Template.login.events({
    'submit #login-form': function(event){
        event.preventDefault();
        var usernameval = $("#username").val();
        var passwordval = $("#password").val();
        if(usernameval!="" && passwordval!=""){
            Meteor.loginWithPassword(usernameval, passwordval, function(err){
                if(err){
                    throwErrorTranslated("error.login_credentials_wrong");
                }else{
                    toastTrans("toast.login_success");
                    Router.go('timeline');
                }
            });
        }else{
            throwErrorTranslated("error.login_credentials_wrong");
        }
    },
});
