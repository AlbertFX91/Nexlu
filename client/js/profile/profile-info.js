Template.profileInfoUser.helpers({
    canSee: function(){
        var isPrivate = this.user.private_profile;
        if(!isPrivate){
            return true;
        }
        var user = Meteor.user();
        if(user && user._id == this.user._id){
            return true;
        }
        var isFollowed = false;
        if(user){
            isFollowed = _.contains(user.followed, this.user._id);
        }
        return isPrivate && isFollowed;
    }
});