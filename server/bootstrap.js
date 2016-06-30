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

    if (ChatRooms.find().count() === 0){
        createChatRooms();
    }

    if (Publications.find().count() === 0){
        createPublications();
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
        password: 'user4',
    });

    var id_user5 = Accounts.createUser({
        username: 'user5',
        email: 'user5@gmail.com',
        password: 'user5',
    });

    Meteor.users.update(id_user1, {
        $set: {
            followers: [id_user2],
            followed: [id_user2],
            "emails.0.verified": true,
        }
    });

    Meteor.users.update(id_user2, {
        $set: {
            followers: [id_user1, id_user3, id_user4, id_user5],
            followed: [id_user1, id_user3, id_user4, id_user5],
            "emails.0.verified": true,
        }
    });

    Meteor.users.update(id_user3, {
        $set: {
            followers: [id_user2],
            followed: [id_user2],
            "emails.0.verified": true,
        }
    });

    Meteor.users.update(id_user4, {
        $set: {
            followers: [id_user2, id_user5],
            followed: [id_user2, id_user5],
            "emails.0.verified": true,
        }
    });

    Meteor.users.update(id_user5, {
        $set: {
            followers: [id_user2, id_user4],
            followed: [id_user2, id_user4],
            "emails.0.verified": true,
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
        players: [user1._id, user2._id],
        messages: [
            {
                order: 1,
                createdAt: new Date('2016-06-03T12:00:00'),
                message: "Hola!",
                player: user1._id
            },
            {
                order: 2,
                createdAt: new Date('2016-06-03T12:05:00'),
                message: "Hola user1! Me alegro de verte!",
                player: user2._id
            },
            {
                order: 3,
                createdAt: new Date('2016-06-03T12:07:00'),
                message: "Igualmente! Que tal te va todo?",
                player: user1._id
            },
            {
                order: 4,
                createdAt: new Date('2016-06-03T12:08:00'),
                message: "No puedo quejarme la verdad!!",
                player: user2._id
            },
            {
                order: 5,
                createdAt: new Date('2016-06-03T12:08:00'),
                message: "Trabajando mucho, pero ya llega el verano!",
                player: user2._id
            },
            {
                order: 6,
                createdAt: new Date('2016-06-03T12:10:00'),
                message: "Jaja espero verte este verano!",
                player: user1._id
            }
        ]
    });

    ChatRooms.insert({
        players: [user2._id, user3._id],
        messages: [
            {
                order: 1,
                createdAt: new Date('2016-06-03T12:00:00'),
                message: "Hola user2!",
                player: user2._id
            },
            {
                order: 2,
                createdAt: new Date('2016-06-03T12:05:00'),
                message: "Hola user1! que tal?! :)",
                player: user3._id
            },
            {
                order: 3,
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
        owner: [
            {
                id: user1._id,
                username: user1.username
            }
        ],
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
                createdAt: new Date('2016-06-03T12:05:00'),
                description: "Nice publication!",
                player: user2._id,
                playersLike: [user1._id],
                playersDislike: [],
                sons: []
            },
            {
                createdAt: new Date('2016-06-03T12:08:00'),
                description: "Nice one dude!",
                player: user3._id,
                playersLike: [user1._id],
                playersDislike: [user2._id],
                sons: [
                    {
                    createdAt: new Date('2016-06-03T13:00:00'),
                    description: "Thanks men!",
                    player: user1._id,
                    playersLike: [user3._id],
                    playersDislike: [],
                    sons: []
                    }
                ]
            }
        ]
    });
    Publications.insert({
        owner: [
            {
                id: user1._id,
                username: user1.username
            }
        ],
        createdAt: new Date('2016-06-08T12:00:00'),
        playersTagged: [],
        description: "My second publication!!!",
        playersLike: [],
        playersDislike: [],
        comments: []
    });
    Publications.insert({
        owner: [
            {
                id: user1._id,
                username: user1.username
            }
        ],
        createdAt: new Date('2016-06-13T12:00:00'),
        playersTagged: [],
        description: "My third publication!!!",
        playersLike: [],
        playersDislike: [],
        comments: []
    });
    Publications.insert({
        owner: [
            {
                id: user1._id,
                username: user1.username
            }
        ],
        createdAt: new Date('2016-06-20T12:00:00'),
        playersTagged: [],
        description: "My fourth publication!!!",
        playersLike: [],
        playersDislike: [],
        comments: []
    });
    Publications.insert({
        owner: [
            {
                id: user1._id,
                username: user1.username
            }
        ],
        createdAt: new Date('2016-06-27T12:00:00'),
        playersTagged: [],
        description: "My fifth publication!!!",
        playersLike: [],
        playersDislike: [],
        comments: []
    });

    //User 2
    Publications.insert({
        owner: [
            {
                id: user2._id,
                username: user2.username
            }
        ],
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
                createdAt: new Date('2016-06-04T12:00:00'),
                description: "Nice to see you!",
                player: user1._id,
                playersLike: [user2._id],
                playersDislike: [],
                sons: [
                    {
                        createdAt: new Date('2016-06-08T12:00:00'),
                        description: "Me too dude!",
                        player: user2._id,
                        playersLike: [],
                        playersDislike: [],
                        sons: []
                    }
                ]
            }
        ]
    });


}