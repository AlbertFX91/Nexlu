Template.requests_follow.helpers({
    userFrom: function(){
        return ReactiveMethod.call("userRequestFrom", this.from);
    },
    hasRequests: function(){
        console.log(Meteor.user().requestsFollow.length > 0);
        return Meteor.user().requestsFollow.length > 0;
    },
    numRequests: function(){
        return Meteor.user().requestsFollow.length;
    }
});

Template.requests_follow.onRendered(function(){
    $('#requests_follow').addClass("active");
});

Template.requests_follow.events({
    'click .accept-request': function(e){
        e.preventDefault();
        console.log("Aceptando request con usuario con id: "+this.from);
        Meteor.call('accept-request', this.from, function(err, response) {
            if (err){
                console.log(err);
            }
        });
    },
    'click .reject-request': function(e){
        e.preventDefault();
        console.log("Rechazando request con usuario con id: "+this.from);
        Meteor.call('reject-request', this.from, function(err, response) {
            if (err){
                console.log(err);
            }
        });
    }
});