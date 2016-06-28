Template.profileViews.events({
    'click .profile-view-container': function(event){
        var comp = $(event.target);
        var route = "";
        if(comp.attr('data-view') === undefined){
            route = comp.closest(".profile-view-container").attr('data-view');
        }else {
            route = comp.attr('data-view');
        }
        Router.go(route);
    }
});

Template.profileInfo.helpers({
    'bio': function(){
        var user_id = Meteor.userId();
        var user = Meteor.users.findOne(user_id);
        return user.bio;
    }
});

Template.profileInfo.events({
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