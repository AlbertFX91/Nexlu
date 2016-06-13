UserUtils = {
    verifiedUser: function(){
        var user = Meteor.user();
        return user!=null && (user.profile!=undefined  || (user.emails!=undefined && user.emails[0].verified));
    }
};