Template.profileViewsUser.helpers({
    canSee: function(){
        var user = Meteor.user();
        if(user._id == this.user._id){
            return true;
        }
        var isPrivate = this.user.private_profile;
        if(!isPrivate){
            return true;
        }
        var isFollowed = false;
        if(user){
            isFollowed = _.contains(user.followed, this.user._id);
        }
        return isPrivate && isFollowed;
    }
});