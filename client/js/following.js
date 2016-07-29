Template.following.helpers({
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
});

//// FollowingUser (usado para los perfiles de los usarios) /////

Template.followingUser.helpers({
    searchFollowingUser: function(){
        var userProfile = true;
        var url = document.location.href.split("/");
        var usernameProfile = url[4];
        Meteor.call("findFollowing", usernameProfile, userProfile, function(e,r){
            Session.set("resultSearchFollowingUser",r);
        });
        var users = Session.get("resultSearchFollowingUser");
        return users;
    },
    isFollowed: function(){
        var username = $(this).attr("username");
        Meteor.call("find.is.followed", username, function(e,r){
            Session.set("isFollowed",r);
        });
        var isFollowed = Session.get("isFollowed");
        return isFollowed;
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