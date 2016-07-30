Template.followers.helpers({
    searchFollowers: function(){
        var userProfile = false;
        Meteor.call("findFollowers", null, userProfile, function(e,r){
            Session.set("resultSearchFollowers",r);
        });
        var users = Session.get("resultSearchFollowers");
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

Template.followers.events({
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

//// FollowersUser (usado para los perfiles de los usarios) /////

Template.followersUser.helpers({
    searchFollowersUser: function(){
        var userProfile = true;
        var url = document.location.href.split("/");
        var usernameProfile = url[4];
        Meteor.call("findFollowers", usernameProfile, userProfile, function(e,r){
            Session.set("resultSearchFollowersUser",r);
        });
        var users = Session.get("resultSearchFollowersUser");
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

Template.followersUser.events({
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