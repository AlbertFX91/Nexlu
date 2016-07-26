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

Template.profileViewsUser.helpers({
    isPrivate: function(){
        var username = $(this).attr("username");
        Meteor.call("find.privacity.byUser", username, function(e,r){
            Session.set("isPrivate",r);
        });
        var isPrivate = Session.get("isPrivate");
        return isPrivate;
    },
    isPrivateButFollower: function(){
        var username = $(this).attr("username");
        Meteor.call("find.privacity.byUser", username, function(e,r){
            Session.set("isPrivate",r);
        });
        var isPrivate = Session.get("isPrivate");
        Meteor.call("find.is.followed", username, function(e,r){
            Session.set("isFollowed", r);
        });
        var isFollowed = Session.get("isFollowed");
        var result = false;
        if(isPrivate == true && isFollowed == true){
            result = true;
        }
        console.log(result);
        return result;
    }
});