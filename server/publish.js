Meteor.publish('myPublications', function () {
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    return Publications.find({"owner": user_id});
});
Meteor.publish('user.me', function () {
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    return Meteor.users.find(user_id, {
        fields: Fields.user.all
    });
});

Meteor.publish('publication.me.none', function () {
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    return Publications.find({owner: user_id}, {fields: Fields.publication.none});
});


Meteor.publish("allUsers", function () {
    return Meteor.users.find({});
});

Meteor.publish('image.me.miniature', function(){
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    return Images.find({'owner.id': user_id}, {fields: Fields.image.miniature});
});


/*
Diccionario para almacenar todos los fields que se mostraran al publicar una colección.
Esto se realiza para poder centralizar los cambios. Si por ejemplo, se añaden nuevos atributos a un usuario,
cambiando solo en este diccionario cambiaremos todas las publicaciones automaticamente.
 */
Fields = {
    user: {
        all: {
            _id: 1,
            username: 1,
            emails: 1,
            followed: 1,
            followers: 1
        },
    },
    publication: {
        all: {
            _id: 1,
            owner: 1,
            createdAt: 1,
            playersTagged: 1,
            description: 1,
            playersLike: 1,
            playersDislike: 1,
            comments: 1
        },
        none: {
            _id: 1
        }
    },
    image: {
        miniature: {
            _id: 1,
            owner: 1,
            url: 1
        }
    }
};