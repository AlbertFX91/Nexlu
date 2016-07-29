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
        //Session.set("first_bio", false);
        var bio = this.user.bio;
        //if(Session.get("first_bio") == false) {
        //    $("#textarea1").val(bio);
        //}
        return bio;
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
    }
});
