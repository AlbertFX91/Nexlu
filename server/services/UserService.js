UserService = {
    verified: function(user_id){
        var user = Meteor.users.findOne(user_id);
        return user!=null && (user.profile!=undefined  || (user.emails!=undefined && user.emails[0].verified))
    }
}