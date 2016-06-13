Template.profile.onRendered(function () {
    console.log(Meteor.user());
});

Template.profile.helpers({
    friends_pretty: function(){
        return Prettify.compactInteger(this.friends.length);
    }
});