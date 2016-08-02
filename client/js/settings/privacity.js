Template.privacity.events({
    'change input': function(event) {
        Meteor.call("changePrivacity", event.target.checked);
    }
});

Template.privacity.onRendered(function(){
    $('#privacity').addClass("active");
});

Template.privacity.helpers({
    privacity_profile: function(){
        Meteor.call("find.privacity", function(e,r){
            Session.set("private_profile",r);
        });
        var private_profile = Session.get("private_profile");
        return private_profile;
    },
    hasRequests: function(){
        return Meteor.user().requestsFollow.length > 0;
    },
    numRequests: function(){
        return Meteor.user().requestsFollow.length;
    }
});