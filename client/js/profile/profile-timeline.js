Template.profileTimeline.helpers({
    publications: function () {
        var user_id = Meteor.userId();
        return Publications.find({},{sort: {createdAt: -1}});
    }
});