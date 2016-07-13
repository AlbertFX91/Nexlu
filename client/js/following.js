Template.following.helpers({
    searchFollowing: function(){
        Meteor.call("findUsers", function(e,r){
            Session.set("result",r);
        });
        var users = Session.get("result");
        return users;
    }
});

Template.following.events({
    'click .button-unfollow': function (event) {
        event.preventDefault();
        var username = $(this).attr("username");
        Meteor.call("unfollow", username);
    }
});