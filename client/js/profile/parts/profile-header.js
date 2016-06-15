Template.profileHeader.onRendered(function () {
    console.log(Meteor.user());
});

Template.profileHeader.helpers({
    friends_pretty: function(){
        return Prettify.compactInteger(this.friends.length);
    }
});