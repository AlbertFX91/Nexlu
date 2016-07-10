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
    var currentLang = Session.get("currentLang");
    if(currentLang) TAPi18n.setLanguage(currentLang)
});

Router.route('/', function () {
    this.render('home');
}, {
    name: 'home',
    onBeforeAction: function (pause) {
        if (Meteor.user()) {
            this.render('timeline');
            return subs.subscribe('myPublications');
        } else {
            this.next();
        }
    }
});

Router.route('/register', function () {
    Session.set("alert", null);
    this.render('register');
}, {
    name: 'register'
});

Router.route('/about-us', function () {
    this.render('AboutUs');
}, {
    name: 'AboutUs'
});

Router.route('/contact-us', function () {
    this.render('ContactUs');
}, {
    name: 'ContactUs'
});

Router.route('/thanks_register', function () {
    this.render('thanks_register');
}, {
    name: 'thanks_register'
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
        return {
            me: Meteor.user(),
            numPublication: Publications.find().fetch().length
        };
    },
    waitOn: function(){
        return [Meteor.subscribe("user.me"), Meteor.subscribe("publication.me.none")];
    },
    name: 'myProfile'
});
Router.route('/me/photos', {
    template: 'profilePhotos',
    controller: 'MyProfileController',
    data: function () {
        return {
            me: Meteor.user(),
            numPublication: Publications.find().fetch().length
        };
    },
    waitOn: function(){
        return [Meteor.subscribe("user.me"), Meteor.subscribe("publication.me.none")];
    },
    name: 'myPhotos'
});
Router.route('/me/info', {
    template: 'profileInfo',
    controller: 'MyProfileController',
    data: function () {
        return {
            me: Meteor.user(),
            numPublication: Publications.find().fetch().length
        };
    },
    waitOn: function(){
        return [Meteor.subscribe("user.me"), Meteor.subscribe("publication.me.none")];
    },
    name: 'myInfo'
});
Router.route('/me/following', function () {
    this.render('following');
}, {
    name: 'following',
    before: filters.isLogued
});


Router.route('faq', {
    template: 'Faq',
    name: 'Faq'
});


Router.route('terms', {
    template: 'terms',
    name: 'terms'
});