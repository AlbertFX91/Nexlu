/*Template.following.helpers({
    searchFollowing: function(){
        var userProfile = false;
        Meteor.call("findFollowing", null, userProfile, function(e,r){
            Session.set("resultSearchFollowing",r);
        });
        var users = Session.get("resultSearchFollowing");
        return users;
    }
});

Template.following.events({
    'click .button-unfollow': function (event) {
        event.preventDefault();
        var username = $(this).attr("username");
        Meteor.call("unfollow", username);
        location.reload();
    },
    'click .button-profile': function (event) {
        event.preventDefault();
        var username = $(this).attr("username");
        Router.go('profile',{username: username});
    },
    'click #followUser': function(event){
        //TODO
    },
    'click #unfollowUser': function(event){
        //TODO
    }
});*/

//// FollowingUser (usado para los perfiles de los usarios) /////

Template.followingUser.helpers({
    isFollowed: function(){
        return _.contains(Meteor.user().followed,this._id);
    },
    canFollowUnfollow: function(){
        //Comprobamos que estamos consultando mi lista de usuarios a los que estoy siguiendo. De ser asi puedo seguir o dejar de seguir.
        return Meteor.user() && Template.parentData().parent._id == Meteor.user()._id;
    }
});

Template.followingUser.events({
    'click .button-profile': function (event) {
        event.preventDefault();
        var username = $(this).attr("username");
        Router.go('profile',{username: username});
    },
    'click #followUser': function(event){
        event.preventDefault();
        var username = $(this).attr("username");
        Meteor.call("followUser", username);
        location.reload();
    },
    'click #unfollowUser': function(event){
        event.preventDefault();
        var username = $(this).attr("username");
        Meteor.call("unfollow", username);
        location.reload();
    }
});