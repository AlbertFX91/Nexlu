Template.comment.helpers({
    username: function(){
        return ReactiveMethod.call('getUsernameById', this.player, function(err, response){
            if(err){
                console.log(err);
            }
        });
    },
    iLike: function() {
        return _.contains(this.playersLike, Meteor.userId().trim());
    },
    iDislike: function() {
        return _.contains(this.playersDislike, Meteor.userId().trim());
    }
});

Template.comment.events({
    'click #like': function (e) {
        e.preventDefault();
        var commentId = this.id;
        Meteor.call('likeComment', commentId, function(err, response){
            if(err){
                console.log(err);
            }
        });
    },
    'click #dislike': function (e) {
        e.preventDefault();
        var commentId = this.id;
        Meteor.call('dislikeComment', commentId, function(err, response){
            if(err){
                console.log(err);
            }
        });
    },
    'click #i-like': function (e) {
        e.preventDefault();
        var commentId = this.id;
        if (_.contains(this.playersLike, Meteor.userId())){
            Meteor.call('removeLikeComment', commentId, function(err, response){
                if(err){
                    console.log(err);
                }
            });
        }
    },
    'click #i-dislike': function (e) {
        e.preventDefault();
        var commentId = this.id;
        if (_.contains(this.playersDislike, Meteor.userId())){
            Meteor.call('removeDislikeComment', commentId, function(err, response){
                if(err){
                    console.log(err);
                }
            });
        }
    }
});