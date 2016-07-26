Template.profileHeader.helpers({
    followed_pretty: function(){
        return Prettify.compactInteger(this.me.followed.length);
    },
    followers_pretty: function(){
        return Prettify.compactInteger(this.me.followers.length);
    },
    publications_pretty: function(){
        return Prettify.compactInteger(this.numPublication);
    },
    'bio': function(){
        Session.set("first_bio", false);
        var user_id = Meteor.userId();
        var user = Meteor.users.findOne(user_id);
        var bio = user.bio;
        if(Session.get("first_bio") == false) {
            $("#textarea1").val(bio);
        }
        return bio;
    }
});

Template.profileHeader.onRendered(function(){
    Session.set("first_bio", true);
});

Template.profileHeader.events({
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

//-------- Profile Header User -------------//

Template.profileHeaderUser.events({
    'click #followUser': function(event){
        event.preventDefault();
        var username = $(this).attr("username");
        Meteor.call("followUser", username);
    },
    'click #unfollowUser': function(event){
        event.preventDefault();
        var username = $(this).attr("username");
        Meteor.call("unfollow", username);
    }
});

Template.profileHeaderUser.helpers({
    publications_pretty_user: function(){
        var usernameProfile = this.username;
        Meteor.call("findNumPublications", usernameProfile, function(e,r){
            Session.set("findNumPublications",r);
        });
        var numPublications = Session.get("findNumPublications");
        return numPublications;
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

Template.profileUser.helpers({
    isPrivate: function(){
        var username = $(this).attr("username");
        Meteor.call("find.privacity.byUser", username, function(e,r){
            Session.set("isPrivate",r);
        });
        var isPrivate = Session.get("isPrivate");
        return isPrivate;
    }
});