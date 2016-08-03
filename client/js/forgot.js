Template.forgot_password.events({
    'click #button-forgot': function(){
        var email = document.getElementById("email-reset").value;
        Meteor.call("send_email_reset", email);
        Materialize.toast(TAPi18n.__("toastMail"), 3000);
        Router.go("home");
    }
});

Template.forgot_password.onRendered(function(){
    $('#login-access').removeClass('login-open').addClass('login-close');
    setTimeout(function(){ Session.set('showLoginModal', false); }, 300);
});

Template.forgot_password.helpers({

});