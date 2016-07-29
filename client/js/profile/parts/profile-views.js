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
    canSee: function(){
        var isPrivate = this.private_profile;
        if(!isPrivate){
            return true;
        }
        var isFollowed = false;
        var user = Meteor.user();
        if(user){
            isFollowed = _.contains(user.followed, this._id);
        }
        return isPrivate && isFollowed;
    }
});

Template.profileViewsUser.onRendered(function(e){
    console.log(this);
    console.log(this.data);
})