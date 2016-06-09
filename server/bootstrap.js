Meteor.startup(function () {
    // code to run on server at startup
    var smtp = {
        username: Meteor.settings.mail.user,
        password: Meteor.settings.mail.password,
        server: 'smtp.gmail.com',
        port: 587
    };
    //Configuración de variable de entorno para servidor de correo electrónico
    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

    if (Meteor.users.find().count() === 0) {
        createUsers();
    }
    Accounts.loginServiceConfiguration.remove({
        service: Meteor.settings.facebook.name
    });

    Accounts.loginServiceConfiguration.insert({
        service: Meteor.settings.facebook.name,
        appId: Meteor.settings.facebook.appId,
        secret: Meteor.settings.facebook.secret
    });
    Accounts.loginServiceConfiguration.remove({
        service: Meteor.settings.google.name
    });

    Accounts.loginServiceConfiguration.insert({
        service: Meteor.settings.google.name,
        clientId: Meteor.settings.google.clientId,
        secret: Meteor.settings.google.secret
    });
    Accounts.loginServiceConfiguration.remove({
        service: Meteor.settings.twitter.name
    });

    Accounts.loginServiceConfiguration.insert({
        service: Meteor.settings.twitter.name,
        consumerKey: Meteor.settings.twitter.consumerKey,
        secret: Meteor.settings.twitter.secret
    });
});


function createUsers(){
	var id_user1 = Accounts.createUser({
            username: 'user1',
            email: 'user1@gmail.com',
            password: 'user1'
    });
    var id_user2 = Accounts.createUser({
            username: 'user2',
            email: 'user2@gmail.com',
            password: 'user2'
    });
    var id_user3 = Accounts.createUser({
            username: 'user3',
            email: 'user3@gmail.com',
            password: 'user3'
    });
}