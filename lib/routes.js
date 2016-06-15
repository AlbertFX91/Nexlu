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
Router.route('verify-email', {
    controller: 'AccountController',
    path: '/verify-email/:token',
    action: 'verifyEmail'
});

Router.route('/me', {
    template: 'profileTimeline',
    controller: 'MyProfileController',
    data: function () {
        return Meteor.user();
    },
    waitOn: function(){
        return Meteor.subscribe("user.me");
    },
    name: 'myProfile'
});
Router.route('/me/photos', {
    template: 'profilePhotos',
    controller: 'MyProfileController',
    data: function () {
        return Meteor.user();
    },
    waitOn: function(){
        return Meteor.subscribe("user.me");
    },
    name: 'myPhotos'
});
Router.route('/me/info', {
    template: 'profileInfo',
    controller: 'MyProfileController',
    data: function () {
        return Meteor.user();
    },
    waitOn: function(){
        return Meteor.subscribe("user.me");
    },
    name: 'myInfo'
});