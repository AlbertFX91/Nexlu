Template.profileHeaderUser.onRendered(function(){
    $("#textarea1").val(this.data.user.bio);
    //Session.set("first_bio", true);
});

Template.profileHeaderUser.helpers({
    followed_pretty: function(){
        return Prettify.compactInteger(this.user.followed.length);
    },
    followers_pretty: function(){
        return Prettify.compactInteger(this.user.followers.length);
    },
    publications_pretty: function(){
        return Prettify.compactInteger(this.numPublication);
    },
    itsMe: function(){
        return Meteor.user() && Meteor.user()._id == this.user._id;
    },
    bio: function(){
        var bio = this.user.bio;
        return bio;
    },
    isFollowed: function(){
        return _.contains(Meteor.user().followed,this.user._id);
    },
    canFollowUnfollow: function(){
        return Meteor.user() && this.user._id != Meteor.user()._id;
    }
});

Template.profileHeaderUser.events({
    'mouseenter .bio':function(){
        $('#bio').css('visibility', "visible");
    },
    'mouseleave  .bio':function(){
        $('#bio').css('visibility', "hidden");
    },
    'click #a_bio': function(event){
        event.preventDefault();
        $('#modal1').openModal();
    },
    'click #edit_bio':function(event){
        event.preventDefault();
        var bio = document.getElementById('textarea1').value;
        Meteor.call("modify_bio", bio);
    },
    /*'click #followUser': function(event){
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
    },*/
    'click #followUser': function(event){
        event.preventDefault();
        var username = this.user.username;
        Meteor.call("followUser", username);
    },
    'click #unfollowUser': function(event){
        event.preventDefault();
        var username = this.user.username;
        Meteor.call("unfollow", username);
    }
});

