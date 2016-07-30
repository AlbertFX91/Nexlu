Template.profileInfoUser.helpers({
    canSee: function(){
        var isPrivate = this.user.private_profile;
        if(!isPrivate){
            return true;
        }
        var isFollowed = false;
        var user = Meteor.user();
        if(user){
            isFollowed = _.contains(user.followed, this.user._id);
        }
        return isPrivate && isFollowed;
    }
});