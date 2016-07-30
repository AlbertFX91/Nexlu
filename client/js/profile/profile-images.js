Template.profileImagesUser.helpers({
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
    },
    itsMe: function(){
        return Meteor.user() && Meteor.user()._id == this.user._id;
    }
});