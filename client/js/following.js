Template.following.helpers({
    searchFollowing: function(){
        Meteor.call("findUsers", function(e,r){
            Session.set("result",r);
        });
        var users = Session.get("result");
        console.log(users);
        return users;
    }
});