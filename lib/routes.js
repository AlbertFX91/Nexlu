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
        var user;
        if (Meteor.loggingIn()) {
            this.layout("ApplicationLayout");
            this.render('home');
            return
        } else {
            user = Meteor.user();
            if (!user) {
                this.layout("ApplicationLayout");
                this.render('home');
                return
            }
        }
        this.layout('ApplicationLayout');
        this.next()
    },
    isNotLogued: function () {
        var user;
        user = Meteor.user();
        if (user) {
            this.layout("ApplicationLayout");
            this.render('home');
            return
        }
        this.layout('ApplicationLayout');
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
Router.route('/me/images', {
    template: 'profileImages',
    controller: 'MyProfileController',
    data: function () {
        return {
            me: Meteor.user(),
            numPublication: Publications.find().fetch().length,
            images: Images.find({"owner.id": Meteor.userId()})
        };
    },
    waitOn: function(){
        return [Meteor.subscribe("user.me"), Meteor.subscribe("publication.me.none"), Meteor.subscribe("image.me.miniature")];
    },
    name: 'myImages'
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

Router.route('faq', {
    template: 'Faq',
    name: 'Faq'
});


Router.route('terms', {
    template: 'terms',
    name: 'terms'
});


Router.route('/img/:_id',{
    template: 'images_show',
    controller: 'LoguedController',
    name: 'images_show',
    waitOn: function(){
        return Meteor.subscribe("image.one", this.params._id);
    },
    data: function(){
        return Images.findOne(this.params._id);
    }
});


// TEST

Router.route('/img/test', function () {
    this.render('s3_tester');
}, {
    name: 's3_tester'
});
Router.route('/img/preview', function () {
    this.render('img_preview');
}, {
    name: 'img_preview'
});
Router.route('/img/filter', function () {
    this.render('img_filter');
}, {
    name: 'img_filter'
});
Router.route('/img/input', {
    template: 'images_input_button',
    controller: 'LoguedController',
    name: 'images_input_button'
});
Router.route('/img/miniatures', {
    template: 'images_miniatures_container',
    controller: 'LoguedController',
    name: 'images_miniatures_container',
    waitOn: function(){
        return Meteor.subscribe("image.me.miniature");
    },
    data: function(){
        return Images.find();
    }
});
Router.route('/img/avatar', {
    template: 'images_avatar',
    controller: 'LoguedController',
    name: 'images_avatar',
});

