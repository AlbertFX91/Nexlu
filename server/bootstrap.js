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
        service: 'facebook'
    });

    Accounts.loginServiceConfiguration.insert({
        service: "facebook",
        appId: '552878074884212',
        secret: '34ce8f878c155cb9dc839fcf7397e7c8'
    });
    Accounts.loginServiceConfiguration.remove({
        service: 'twitter'
    });

    Accounts.loginServiceConfiguration.insert({
        service: "twitter",
        consumerKey: "WHvxoAhHb7bKczbqwvOv3xBf8",
        secret: "bgEQGKpaDg3RsBqvkoZhtSQ70lk0PyJjWVpdyv5kkD8R566YZ6"
    });
    Accounts.loginServiceConfiguration.remove({
        service: 'google'
    });

    Accounts.loginServiceConfiguration.insert({
        service: "google",
        clientId: "761927564374-umhq0tua7577ttp8757t677aks1i99b7.apps.googleusercontent.com",
        secret: "edPJyzYT1_K_XZ5eR7BaGsCr"
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