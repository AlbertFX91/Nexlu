Template.login.events({
    'submit #login-form': function(event){
        event.preventDefault();
        var usernameval = $("#username").val();
        var passwordval = $("#password").val();
        if(usernameval!="" && passwordval!=""){
            Meteor.loginWithPassword(usernameval, passwordval, function(err){
                if(err){
                    Session.set('alert', "login_error_credentials_wrong");
                    $("#error-container").fadeIn("fast");
                }else{
                    Session.set('alert', null);
                    Router.go('home');
                }
            });
        }else{
             Session.set('alert', "login_error_credentials_wrong");
             $("#error-container").fadeIn("fast");
        }
    },
    'click #close-error': function(event){
        $error_container = $("#error-container");
        if($error_container.css("display") != "none"){
            $error_container.fadeOut("fast");
        }

    }
});
Template.login.helpers({
    'alert': function(){
        return Session.get("alert");
    }
});