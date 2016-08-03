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

// Sacado de https://github.com/sclausen/mate-app

InfiniteScrollingController = RouteController.extend({
    onBeforeAction: function () {
        this.state.setDefault('limit', this.increment * 2);
        this.next();
    },
    limit: function () {
        return this.state.get('limit') || this.increment;
    },
    onAfterAction: function () {
        $(window).scroll(this.showMoreVisible);
    },
    showMoreVisible: function () {
        var ctrl = Router.current();
        var threshold, target = $('#showMoreResults');
        if (target.length) {
            threshold = $(window).scrollTop() + $(window).height() - target.height();
            if (target.offset().top <= threshold) {
                if (!target.data('visible')) {
                    target.data('visible', true);
                    ctrl.state.set('limit', ctrl.state.get('limit') + ctrl.increment);
                }
            } else {
                if (target.data('visible')) {
                    target.data('visible', false);
                }
            }
        }
    }
});

PublicationsController = RouteController.extend({
    increment: 1,
    subscriptions: function() {
        return subs.subscribe('news', {}, {
            sort: {
                date: -1
            },
            limit: this.limit()
        });
    },
    publications: function() {
        return Publications.find({
            locale: Session.get('locale'),
            date: {
                $lte: new Date()
            }
        }, {
            sort: {
                date: -1
            },
            limit: this.limit()
        });
    },
    data: function() {
        return {
            news: this.news(),
            ready: this.ready()
        };
    }/*,
    count: function() {
        return Counts.get('all-news');
    }*/
});