
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
    }
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
    }
});
