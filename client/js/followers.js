Template.followers.helpers({
    searchFollowers: function(){
        var userProfile = false;
        Meteor.call("findFollowers", null, userProfile, function(e,r){
            Session.set("resultSearchFollowers",r);
        });
        var users = Session.get("resultSearchFollowers");
        return users;
    }
});

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
    }
});