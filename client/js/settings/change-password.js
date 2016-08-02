Template.change_password.events({

});

Template.change_password.onRendered(function(){
    $('#change_password').addClass("active");
});

Template.change_password.helpers({
    hasRequests: function(){
        return Meteor.user().requestsFollow.length > 0;
    },
    numRequests: function(){
        return Meteor.user().requestsFollow.length;
    }
});