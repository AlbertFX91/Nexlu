Template.timeline.helpers({
    publications: function () {
        return Publications.find({},{sort: {createdAt: -1}});
    }
});

Template.timeline.onCreated(function(){



});
