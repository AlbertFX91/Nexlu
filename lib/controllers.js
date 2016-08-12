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

InfiniteScrollingController = RouteController.extend({
    /*onBeforeAction: function () {
        this.state.setDefault('limit', this.increment * 2);
        this.next();
    },*/
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

HomePublicationController = InfiniteScrollingController.extend({
    increment: 5,
    onBeforeAction: function(){
        if(Meteor.user()!== undefined){
            if (!Meteor.user()) {
                this.render('home');
            } else {
                this.state.setDefault('limit', this.increment * 2);
                this.next();
            }
        }else{
            this.render('loading');
        }
    },
    subscriptions: function() {
        return [
            this.subscribe('publication.me.followed.all', {}, {
                sort: {
                    createdAt: -1
                },
                limit: this.limit()
            }),
            this.subscribe('user.all.username')
        ];
    },
    publications: function() {
        return Publications.find({}, {
            sort: {
                createdAt: -1
            },
            limit: this.limit()
        });;
    },
    data: function() {
        return this.publications();
    },
    count: function() {
        return Counts.get('all-publications');
    }
});

ProfileTimelineController = InfiniteScrollingController.extend({
    increment: 5,
    onBeforeAction: function(){
        this.state.setDefault('limit', this.increment * 2);
        this.next();
    },
    subscriptions: function() {
        return [
            this.subscribe('publication.one.tagged.all', Router.current().params.username, {
                sort: {
                    createdAt: -1
                },
                limit: this.limit()
            }),
            this.subscribe("user.profile.one", Router.current().params.username)
        ];
    },
    publications: function() {
        return Publications.find({}, {
            sort: {
                createdAt: -1
            },
            limit: this.limit()
        });
    },
    data: function() {
        var user = Meteor.users.findOne({username: Router.current().params.username});
        if(!user){
            return null;
        }
        return {
            user: Meteor.users.findOne({username: Router.current().params.username}),
            numPublication: Publications.find({"owner.id": user._id}).fetch().length,
            publications: this.publications()
        };
    },
    count: function() {
        return Counts.get('all-publications-profile');
    }
});