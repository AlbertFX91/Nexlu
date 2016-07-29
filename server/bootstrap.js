Meteor.startup(function () {
    // code to run on server at startup

    // Inicialización de servicios amazon S3
    S3.config = {
        "key": Meteor.settings.amazon.key,
        "secret": Meteor.settings.amazon.secret,
        "bucket": Meteor.settings.amazon.bucket,
        "region": Meteor.settings.amazon.region
    };

    // Inicialización de servicio de mensajería
    var smtp = {
        username: Meteor.settings.mail.user,
        password: Meteor.settings.mail.password,
        server: 'smtp.gmail.com',
        port: 587
    };
    //Configuración de variable de entorno para servidor de correo electrónico
    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;


    // Inicialización de servicios de redes sociales
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

    // Inicialización de datos
    var entorno = Meteor.settings.entorno;
    if(entorno == "desarrollo"){
        if (Meteor.users.find().count() === 0) {
            createUsers();
        }

        if (ChatRooms.find().count() === 0){
            createChatRooms();
        }

        if (Publications.find().count() === 0){
            createPublications();
        }

        if (Images.find().count() === 0){
            createImages();
        }
    }else if (entorno == "preproduccion"){
        Meteor.users.remove({});
        ChatRooms.remove({});
        Images.remove({});
        Publications.remove({});
        
        createUsers();
        createChatRooms();
        createPublications();
        createImages();
    }



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

    var id_user4 = Accounts.createUser({
        username: 'user4',
        email: 'user4@gmail.com',
        password: 'user4'
    });

    var id_user5 = Accounts.createUser({
        username: 'user5',
        email: 'user5@gmail.com',
        password: 'user5'
    });

    Meteor.users.update(id_user1, {
        $set: {
            bio: "Biography 1",
            followers: [id_user2, id_user3],
            followed: [id_user2, id_user3],
            "emails.0.verified": true,
            private_profile: false
        }
    });

    Meteor.users.update(id_user2, {
        $set: {
            bio: "Biography 2",
            followers: [id_user1, id_user3],
            followed: [id_user1, id_user3, id_user4],
            "emails.0.verified": true,
            private_profile: true
        }
    });

    Meteor.users.update(id_user3, {
        $set: {
            followers: [id_user1, id_user2, id_user4],
            followed: [id_user1, id_user2],
            "emails.0.verified": true,
            private_profile: true
        }
    });

    Meteor.users.update(id_user4, {
        $set: {
            bio: "Biography 4",
            followers: [id_user2, id_user5],
            followed: [id_user3, id_user5],
            "emails.0.verified": true,
            private_profile: false
        }
    });

    Meteor.users.update(id_user5, {
        $set: {
            bio: "Biography 5",
            followers: [id_user4],
            followed: [id_user4],
            "emails.0.verified": true,
            private_profile: true
        }
    });

}

function createChatRooms(){
    var user1 = Meteor.users.findOne({username: 'user1'});
    var user2 = Meteor.users.findOne({username: 'user2'});
    var user3 = Meteor.users.findOne({username: 'user3'});
    var user4 = Meteor.users.findOne({username: 'user4'});
    var user5 = Meteor.users.findOne({username: 'user5'});

    ChatRooms.insert({
        players: [
            {
                id: user1._id,
                username: user1.username
            },
            {
                id: user2._id,
                username: user2.username
            }
        ],
        messages: [
            {
                createdAt: new Date('2016-06-03T12:00:00'),
                message: "Hola!",
                player: user1._id
            },
            {
                createdAt: new Date('2016-06-03T12:05:00'),
                message: "Hola user1! Me alegro de verte!",
                player: user2._id
            },
            {
                createdAt: new Date('2016-06-03T12:07:00'),
                message: "Igualmente! Que tal te va todo?",
                player: user1._id
            },
            {
                createdAt: new Date('2016-06-03T12:08:00'),
                message: "No puedo quejarme la verdad!!",
                player: user2._id
            },
            {
                createdAt: new Date('2016-06-03T12:08:00'),
                message: "Trabajando mucho, pero ya llega el verano!",
                player: user2._id
            },
            {
                createdAt: new Date('2016-06-03T12:10:00'),
                message: "Jaja espero verte este verano!",
                player: user1._id
            }
        ]
    });

    ChatRooms.insert({
        players: [
            {
                id: user2._id,
                username: user2.username
            },
            {
                id: user3._id,
                username: user3.username
            }
        ],
        messages: [
            {
                createdAt: new Date('2016-06-03T12:00:00'),
                message: "Hola user2!",
                player: user2._id
            },
            {
                createdAt: new Date('2016-06-03T12:05:00'),
                message: "Hola user1! que tal?! :)",
                player: user3._id
            },
            {
                createdAt: new Date('2016-06-03T12:07:00'),
                message: "Muy bien! No sabia que tu usases esta aplicación!",
                player: user2._id
            }
        ]
    });
}

function createPublications(){
    var user1 = Meteor.users.findOne({username: 'user1'});
    var user2 = Meteor.users.findOne({username: 'user2'});
    var user3 = Meteor.users.findOne({username: 'user3'});
    var user4 = Meteor.users.findOne({username: 'user4'});
    var user5 = Meteor.users.findOne({username: 'user5'});

    //User 1
    Publications.insert({
        owner:{
                id: user1._id,
                username: user1.username
            },
        createdAt: new Date('2016-06-03T12:00:00'),
        playersTagged: [
            {
                id: user2._id,
                username: user2.username
            },
            {
                id: user3._id,
                username: user3.username
            }
        ],
        description: "My first publication!!!",
        playersLike: [user1._id, user2._id, user3._id],
        playersDislike: [user4._id],
        comments: [
            {
                id: new Mongo.ObjectID()._str,
                createdAt: new Date('2016-06-03T12:05:00'),
                description: "Nice publication!",
                player: user2._id,
                playersLike: [user1._id],
                playersDislike: []
            },
            {
                id: new Mongo.ObjectID()._str,
                createdAt: new Date('2016-06-03T12:08:00'),
                description: "Nice one dude!",
                player: user3._id,
                playersLike: [user1._id],
                playersDislike: [user2._id],
            }
        ]
    });
    Publications.insert({
        owner:{
                id: user1._id,
                username: user1.username
            },
        createdAt: new Date('2016-06-08T12:00:00'),
        playersTagged: [],
        description: "My second publication!!!",
        playersLike: [],
        playersDislike: [],
        comments: []
    });
    Publications.insert({
        owner:{
                id: user1._id,
                username: user1.username
            },
        createdAt: new Date('2016-06-13T12:00:00'),
        playersTagged: [],
        description: "My third publication!!!",
        playersLike: [],
        playersDislike: [],
        comments: []
    });
    Publications.insert({
        owner:{
                id: user1._id,
                username: user1.username
            },
        createdAt: new Date('2016-06-20T12:00:00'),
        playersTagged: [],
        description: "My fourth publication!!!",
        playersLike: [],
        playersDislike: [],
        comments: []
    });
    Publications.insert({
        owner:{
                id: user1._id,
                username: user1.username
            },
        createdAt: new Date('2016-06-27T12:00:00'),
        playersTagged: [],
        description: "My fifth publication!!!",
        playersLike: [],
        playersDislike: [],
        comments: []
    });

    //User 2
    Publications.insert({
        owner:{
                id: user2._id,
                username: user2.username
            },
        createdAt: new Date('2016-06-03T23:00:00'),
        playersTagged: [
            {
                id: user1._id,
                username: user1.username
            }
        ],
        description: "Hi NEXLU!!!",
        playersLike: [],
        playersDislike: [],
        comments: [
            {
                id: new Mongo.ObjectID()._str,
                createdAt: new Date('2016-06-04T12:00:00'),
                description: "Nice to see you!",
                player: user1._id,
                playersLike: [user2._id],
                playersDislike: []
            }
        ]
    });


}


function createImages(){
    var user1 = Meteor.users.findOne({username: 'user1'});
    var user2 = Meteor.users.findOne({username: 'user2'});
    var user3 = Meteor.users.findOne({username: 'user3'});
    var user4 = Meteor.users.findOne({username: 'user4'});

    //User 1
    var img1_id = Images.insert({
        owner: 
            {
                id: user1._id,
                username: user1.username
            },
        
        createdAt: new Date('2016-06-03T12:00:00'),
        playersTagged: [
            {
                id: user2._id,
                username: user2.username
            },
            {
                id: user3._id,
                username: user3.username
            }
        ],
        description: "My first image!!!",
        playersLike: [user1._id, user2._id, user3._id],
        playersDislike: [user4._id],
        comments: [
            {
                createdAt: new Date('2016-06-03T12:05:00'),
                description: "Nice publication!",
                player: user2._id,
                playersLike: [user1._id],
                playersDislike: []
            },
            {
                createdAt: new Date('2016-06-03T12:08:00'),
                description: "Nice one dude!",
                player: user3._id,
                playersLike: [user1._id],
                playersDislike: [user2._id]
            }
        ],
        url: "https://s3-us-west-2.amazonaws.com/nexlu/users/call-of-duty-small.jpg"
    });
    Images.insert({
        owner: 
            {
                id: user1._id,
                username: user1.username
            }
        ,
        createdAt: new Date('2016-06-08T12:00:00'),
        playersTagged: [],
        description: "My second publication!!!",
        playersLike: [],
        playersDislike: [],
        comments: [],
        url: "https://s3-us-west-2.amazonaws.com/nexlu/users/nexlu-filter.png"
    });

    //Avatar User1
    Meteor.users.update(user1, {
        $set: {
            avatar:{
                id: img1_id,
                url: "https://s3-us-west-2.amazonaws.com/nexlu/users/call-of-duty-small.jpg"
            }
        }
    });

}