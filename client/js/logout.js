Template.logout.onRendered(function(){
   Meteor.logout();
   Router.go("home");
});