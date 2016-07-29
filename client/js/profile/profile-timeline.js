Template.profileTimeline.helpers({
    publications: function () {
        var user_id = Meteor.userId();
        return Publications.find({},{sort: {createdAt: -1}});
    }
});

Template.profileTimelineUser.helpers({
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