Template.publication.helpers({
    tagged_pretty: function(){
        return Prettify.compactTags(this.playersTagged);
    },
    isMine: function() {
        if (this.owner[0].id.trim() === Meteor.userId().trim())
            return true;
        return false;
    },




    // TODO: Esto hay que hacerlo en el lado del server (methods):
    listLikes: function(likes){
        var likes_username = _.map(likes, function(id){
            var user = Meteor.users.findOne(id, {fields:{username:1}});
            return user.username;
        } )
        return likes_username; // lista con los usernames de los usuarios que le dieron like.
    },
    listDislikes: function(dislikes){
        var dislikes_username = _.map(dislikes, function(id){
            var user = Meteor.users.findOne(id, {fields:{username:1}});
            return user.username;
        } )
        return dislikes_username; // lista con los usernames de los usuarios que le dieron dislikes.
    }
});