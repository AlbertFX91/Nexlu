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

Router.plugin("dataNotFound",{
    notFoundTemplate: "dataNotFound"
});

Router.onBeforeAction(function () {
    $('body,html').scrollTop(0);
    this.next();
    var currentLang = Session.get("currentLang");
    if(currentLang) TAPi18n.setLanguage(currentLang)
});
Router.route('/',{
    name: 'home',
    onBeforeAction: function(pause){
        if(Meteor.user()!== undefined){
            if (Meteor.user()) {
                this.render('timeline');
                return subs.subscribe('publication.followed.all');
            } else {
                this.render('home');
                //this.next();
            }
        }else{
            this.render('loading');
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

Router.route('/logout', function () {
    this.render('logout');
}, {
    name: 'logout',
    before: filters.isLogued
});

Router.route('/new_username', function () {
    this.render('new_username');
}, {
    name: 'new_username',
    before: filters.isNotLogued
});

Router.route('verify-email', {
    controller: 'AccountController',
    path: '/verify-email/:token',
    action: 'verifyEmail'
});

////--Profile other user-------////////////
Router.route("/profile/:username",{
    name:"profile",
    template:"profileUser",
    controller:"ProfileController"
});

Router.route("/profile/:username/photos",{
    name:"profilePhotos",
    template:"profilePhotosUser",
    controller:"ProfileController"
});

Router.route("/profile/:username/info",{
    name:"profileInfo",
    template:"profileInfoUser",
    controller:"ProfileController"
});
Router.route('/profile/:username/following',{
    template: "followingUser",
    name: 'followingUser'
});
Router.route('/profile/:username/followers',{
    template: "followersUser",
    name: 'followersUser'
});

/////////--------------------////////////

Router.route('/me', {
    template: 'profileTimeline',
    controller: 'MyProfileController',
    data: function () {
        return {
            me: Meteor.user(),
            numPublication: Publications.find({"owner.0.id": Meteor.userId()}).fetch().length
        };
    },
    waitOn: function(){
        return [subs.subscribe("user.me"), subs.subscribe("publication.me.none")];
    },
    name: 'myProfile'
});

Router.route('/me/images', {
    template: 'profilePhotos',
    controller: 'MyProfileController',
    data: function () {
        return {
            me: Meteor.user(),
            numPublication: Publications.find({"owner.0.id": Meteor.userId()}).fetch().length,
            images: Images.find({"owner.id": Meteor.userId()})
        };
    },
    waitOn: function(){
        return [subs.subscribe("user.me"), subs.subscribe("publication.me.none"), subs.subscribe("image.me.miniature")];
    },
    name: 'myImages'
});
Router.route('/me/info', {
    template: 'profileInfo',
    controller: 'MyProfileController',
    data: function () {
        return {
            me: Meteor.user(),
            numPublication: Publications.find({"owner.0.id": Meteor.userId()}).fetch().length
        };
    },
    waitOn: function(){
        return [subs.subscribe("user.me"), subs.subscribe("publication.me.none")];
    },
    name: 'myInfo'
});
Router.route('/me/following', function () {
    this.render('following');
}, {
    name: 'following',
    before: filters.isLogued
});
Router.route('/me/followers', function () {
    this.render('followers');
}, {
    name: 'followers',
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

Router.route('/img/:_id',{
    template: 'images_show',
    controller: 'LoguedController',
    name: 'images_show',
    waitOn: function(){
        return subs.subscribe("image.one", this.params._id);
    },
    data: function(){
        return Images.findOne(this.params._id);
    }
});


// TEST

Router.route('/image/test', function () {
    this.render('s3_tester');
}, {
    name: 's3_tester'
});
Router.route('/image/preview', function () {
    this.render('img_preview');
}, {
    name: 'img_preview'
});
Router.route('/image/filter', function () {
    this.render('img_filter');
}, {
    name: 'img_filter'
});
Router.route('/image/input', {
    template: 'images_input_button',
    controller: 'LoguedController',
    name: 'images_input_button'
});
Router.route('/image/miniatures', {
    template: 'images_miniatures_container',
    controller: 'LoguedController',
    name: 'images_miniatures_container',
    waitOn: function(){
        return subs.subscribe("image.me.miniature");
    },
    data: function(){
        return Images.find();
    }
});
Router.route('/image/avatar', {
    template: 'images_avatar',
    controller: 'LoguedController',
    name: 'images_avatar',
});
