Template.follow_users_list.helpers({
    isFollowed: function(){
        return _.contains(Meteor.user().followed,this._id);
    },
    canFollowUnfollow: function(){
        return Meteor.user();
    },
    hasRequestCreated: function(){
        return _.find(this.requestsFollow, function(r){return r.from == Meteor.user()._id});
    }
});

Template.follow_users_list.events({
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