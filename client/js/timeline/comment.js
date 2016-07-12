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