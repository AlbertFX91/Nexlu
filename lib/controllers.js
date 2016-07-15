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
        return Meteor.subscribe("userProfile",this.params.username);
    },
    data:function(){
        var username=Router.current().params.username;
        return Meteor.users.findOne({
            "username":username
        });
    }
});