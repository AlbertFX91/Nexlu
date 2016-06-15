Template.profileHeader.helpers({
    friends_pretty: function(){
        return Prettify.compactInteger(this.friends.length);
    }
});