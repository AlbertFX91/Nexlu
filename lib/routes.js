Router.configure({
    layoutTemplate: 'ApplicationLayout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
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