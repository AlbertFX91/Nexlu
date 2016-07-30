Template.followingUser.helpers({
    isFollowed: function(){
        return _.contains(Meteor.user().followed,this._id);
    },
    canFollowUnfollow: function(){
        //Comprobamos que estamos consultando mi lista de usuarios a los que estoy siguiendo. De ser asi puedo seguir o dejar de seguir.
        return Meteor.user() && Template.parentData().parent._id == Meteor.user()._id;
    }
});

Template.followingUser.events({
    'click .button-profile': function (event) {
        event.preventDefault();
        var username = this.username;
        Router.go('profile',{username: username});
    },
    'click #followUser': function(event){
        event.preventDefault();
        var username = this.username;
        Meteor.call("followUser", username);
    },
    'click #unfollowUser': function(event){
        event.preventDefault();
        var username = this.username;
        Meteor.call("unfollow", username);
    }
});