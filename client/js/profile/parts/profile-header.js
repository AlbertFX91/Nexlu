Template.profileHeader.helpers({
    followed_pretty: function(){
        return Prettify.compactInteger(this.followed.length);
    },
    followers_pretty: function(){
        return Prettify.compactInteger(this.followers.length);
    }
});