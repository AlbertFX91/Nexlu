Template.logout.onRendered(function(){
    console.log("EN LOGOUT");
    Meteor.logout();
    msg = TAPi18n.__('toast.logout_success')+'&nbsp;&nbsp;<i class="fa fa-hand-peace-o" aria-hidden="true"></i>'
    Toasts.throw(msg);
    Router.go("home");
});