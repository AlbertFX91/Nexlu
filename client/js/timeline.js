Template.timeline.helpers({
    publications: function () {
        var user_id = Meteor.userId();

        //return Publications.find({"owner.0.id": user_id},{sort: {createdAt: 1}});
        //return Publications.find({"owner.0.id": user_id});
        return Publications.find();
    }
});