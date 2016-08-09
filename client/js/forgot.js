Template.forgot_password.events({
    'submit .email_forgot': function(){
        var email = document.getElementById("email_reset").value;
        var currentLocale = TAPi18n.getLanguage();
        Meteor.call("send_email_reset", email,currentLocale);
        Materialize.toast(TAPi18n.__("toastMail"), 3000);
        Router.go("home");
    }
});

Template.forgot_password.onRendered(function(){
    $('#login-access').removeClass('login-open').addClass('login-close');
    setTimeout(function(){ Session.set('showLoginModal', false); }, 300);
    $( "#email_forgot" ).validate({
        rules: {
            email_reset: {
                required: true
            }
        },
        messages: {
            email_reset: {
                required: TAPi18n.__("error.email_error_empty")
            }
        }
    });
});