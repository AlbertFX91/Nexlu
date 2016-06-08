Template.logout.onRendered(function(){
    Meteor.logout();
    msg = TAPi18n.__('toast.logout_success')+'&nbsp;&nbsp;<i class="fa fa-hand-peace-o" aria-hidden="true"></i>'
    toast(msg);
    Router.go("home");
});