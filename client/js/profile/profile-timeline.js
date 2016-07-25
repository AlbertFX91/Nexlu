Template.profileTimeline.helpers({
    publications: function () {
        var user_id = Meteor.userId();
        return Publications.find({"owner.id": user_id},{sort: {createdAt: -1}});
    }
});