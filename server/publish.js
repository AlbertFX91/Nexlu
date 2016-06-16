Meteor.publish('myPublications', function () {
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    return Publications.find({"owner": user_id});
});

Meteor.publish("allUsers", function () {
    return Meteor.users.find({});
});