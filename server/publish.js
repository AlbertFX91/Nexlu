Meteor.publish('publication.me.all', function () {
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    return Publications.find({"owner.0.id": user_id}, {fields: Fields.publication.all});
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

Meteor.publish('search.users', function () {
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    console.log(user_id);
    return Meteor.users.find({}, {
        //TODO: _id: {$ne: user_id},
        fields: {
            username: 1
        }
    });
});
/**
 * Devuelve los usuarios que siguen al usuario logueado, y que el usuario logueado tambien sigue. Es una relación reciproca.
 * Se usa para devolver los usuarios con los que podemos chatear
 */
Meteor.publish('user.each.online', function () {
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    var user = Meteor.users.findOne(user_id);
    return Meteor.users.find(
        {
            _id: { $in: user.followers },
            followers: user_id,
            "status.online": true
        },
        {
            fields: Fields.user.all
        }
    );
});

Meteor.publish('image.me.miniature', function(){
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    return Images.find({'owner.id': user_id}, {fields: Fields.image.miniature});
});

Meteor.publish('publication.me.none', function () {
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    return Publications.find({"owner.0.id": user_id}, {fields: Fields.publication.none});
});

Meteor.publish('publication.user.none', function (usernameUser) {
    var user = Meteor.users.find({'username':usernameUser});
    var user_id = user._id;
    if (!user_id) {
        this.ready();
        return;
    }
    return Publications.find({owner: user_id}, {fields: Fields.publication.none});
});

Meteor.publish("findBio", function () {
    return Meteor.users.find(this.userId);
});

Meteor.publish('image.me.miniature', function(){
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    return Images.find({'owner.id': user_id}, {fields: Fields.image.miniature});
});
Meteor.publish('publication.followed.all', function () {
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    var followed_id = Meteor.users.find(user_id, {fields: Fields.user.followed}).fetch();
    return Publications.find({"owner.0.id": {"$in": [followed_id.followed]}}, {fields: Fields.publication.all});
});
Meteor.publish('image.one', function(img_id){
    return Images.find(img_id, {fields: Fields.image.all});
});

Meteor.publish("findUser", function(username) {
    return Meteor.users.findOne({"username": username}, { fields: { "username": 1 } } );
});

Meteor.publish("userProfile",function(username){
    var user=Meteor.users.findOne({"username":username});
    if(!user){
        this.ready();
        return;
    }
    if(this.userId==user._id){
        return Meteor.users.find(this.userId);
    }
    else{
        return Meteor.users.find(user._id,{
            fields:{
                "profile":0
            }
        });
    }
});

Meteor.publish("chatroom.mine", function(id){
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    return ChatRooms.find({"players.id": user_id});
});

Meteor.publish("emojis", function(){
    return Emojis.find();
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
            bio: 1,
            followed: 1,
            followers: 1,
            status: 1
        },
        followed: {
            followed: 1
        }
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
        },
        all: {
            _id: 1,
            owner: 1,
            url: 1,
            createdAt: 1,
            playersTagged: 1,
            description: 1,
            playersLike: 1,
            playersDislike: 1,
            comments: 1
        }
    }
};