var subs = new SubsManager({
    // maximum number of cache subscriptions
    cacheLimit: 10,
    // any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 5
});

var filters = {

  /**
   * ensure user is l
   */
    isLogued: function () {
        var user
        if (Meteor.loggingIn()) {
            this.layout("ApplicationLayout");
            this.render('home');
            return
        } else {
            user = Meteor.user()
            if (!user) {
                this.layout("ApplicationLayout");
                this.render('home');
                return
            }
        }
        this.layout('ApplicationLayout')
        this.next()
    },
    isNotLogued: function () {
        var user
        user = Meteor.user()
        if (user) {
            this.layout("ApplicationLayout");
            this.render('home');
            return
        }
        this.layout('ApplicationLayout')
        this.next()
    }
};

Router.configure({
    layoutTemplate: 'ApplicationLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.onBeforeAction(function () {
    $('body,html').scrollTop(0);
    this.next();
});

Router.route('/', function () {
    this.render('home');
}, {
    name: 'home'
});

Router.route('/about-us', function () {
    this.render('AboutUs');
}, {
    name: 'AboutUs'
});

Router.route('/login', function () {
    this.render('login');
}, {
    name: 'login',
    before: filters.isNotLogued
});

Router.route('/logout', function () {
    this.render('logout');
}, {
    name: 'logout',
    before: filters.isLogued
});

Router.route('/timeline', function () {
    this.render('timeline');
}, {
    name: 'timeline',
    onBeforeAction: function (pause) {
        if (!Meteor.user()) {
            this.render('login');
        } else {
            this.next();
        }
    },
    waitOn: function () {
        //TODO: Subscripciones
        return subs.subscribe('myPublications');
    },
    before: filters.isLogued
});

Router.route('verify-email', {
    controller: 'AccountController',
    path: '/verify-email/:token',
    action: 'verifyEmail'
});