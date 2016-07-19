var subs = new SubsManager({
    // maximum number of cache subscriptions
    cacheLimit: 10,
    // any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 5
});
AccountController = RouteController.extend({
    verifyEmail: function () {
        Accounts.verifyEmail(this.params.token, function () {
            Router.go('home');
            toastTrans("toast.verify_thanks");
        });
    }
});

MyProfileController = RouteController.extend({
    onBeforeAction: function () {
        var verified = UserUtils.verifiedUser();
        if(!verified){
            this.render('login');
        }else {
            this.next();
        }
    }
});

LoguedController = RouteController.extend({
    onBeforeAction: function () {
        var verified = UserUtils.verifiedUser();
        if (!verified) {
            this.render('login');
        } else {
            this.next();
        }
    }
});

ProfileController = RouteController.extend({
    waitOn:function(){
        return subs.subscribe("userProfile",this.params.username);
    },
    data:function(){
        var username=Router.current().params.username;
        return Meteor.users.findOne({
            "username":username
        });
    }
});