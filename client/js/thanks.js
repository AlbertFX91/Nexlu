Template.thanks_register.events({
    'click #emailVerification': function(){
        Meteor.call("send_email_verification", Session.get("user"));
        Materialize.toast(TAPi18n.__("toastMail"), 3000);
    }
});

Template.thanks_register.onRendered(function(){
});

Template.thanks_register.helpers({

});