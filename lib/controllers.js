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