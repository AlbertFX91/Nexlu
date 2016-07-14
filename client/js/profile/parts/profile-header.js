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
            document.getElementById('textarea1').value = bio;
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
    publications_pretty_user: function(){
        //return Prettify.compactInteger(this.numPublication); //TODO: Coger el nº de publicaciones del user en cuestion
        var url = document.location.href.split("/");
        var usernameProfile = url[4];
        Meteor.call("findNumPublications", usernameProfile, function(e,r){
            Session.set("findNumPublications",r);
        });
        var numPublications = Session.get("findNumPublications");
        return numPublications;
    }
});