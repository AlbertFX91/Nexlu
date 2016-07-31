Template.Settings.onRendered(function(){
    $(document).ready(function(){
        $('ul.tabs').tabs();
    });
    $('#general').addClass("active");
});


Template.Settings.helpers({
    hasRequests: function(){
        console.log(Meteor.user().requestsFollow.length > 0);
        return Meteor.user().requestsFollow.length > 0;
    },
    numRequests: function(){
        return Meteor.user().requestsFollow.length;
    }
});