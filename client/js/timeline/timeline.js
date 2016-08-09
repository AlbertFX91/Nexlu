Template.timeline.helpers({
    /*publications: function () {
        return Publications.find({},{sort: {createdAt: -1}});
    }*/
    moreResults: function() {
        var ctrl = Iron.controller();
        return ctrl.state.get('limit') < ctrl.count();
    }
});

Template.timeline.events({
    'click #showMoreResults': function (e) {
        e.preventDefault();
        var ctrl = Iron.controller();
        ctrl.state.set('limit', ctrl.state.get('limit') + ctrl.increment);
    }
});
