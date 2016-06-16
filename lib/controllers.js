AccountController = RouteController.extend({
    verifyEmail: function () {
        Accounts.verifyEmail(this.params.token, function () {
            Router.go('home');
            toastTrans("toast.verify_thanks");
        });
    }
});