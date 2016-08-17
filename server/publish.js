Meteor.publish('publication.me.all', function () {
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    return Publications.find({$and:[{"owner.id": user_id}, {"url": {$exists:false}}]}, {fields: Fields.publication.all});
});

Meteor.publish('publication.one.all', function (username) {
    var user = Meteor.users.findOne({username: username});
    return Publications.find({$and:[{"owner.id": user._id}, {"url": {$exists:false}}]}, {fields: Fields.publication.all});
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

Meteor.publish('user.one', function (username) {
    return Meteor.users.find({username: username}, {
        fields: Fields.user.all
    });
});

Meteor.publish('user.profile.one', function (username) {
    return Meteor.users.find({username: username}, {
        fields: Fields.user.profile
    });
});



Meteor.publish('search.users', function () {
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
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
Meteor.publish('user.each.chat', function () {
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    var user = Meteor.users.findOne(user_id);
    return Meteor.users.find(
        {
            _id: { $in: user.followers },
            followers: user_id
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
    return Publications.find({$and: [{"owner.id": user_id}, {"url": {$exists:true, $ne: null}}]}, {fields: Fields.image.miniature});
});

Meteor.publish('image.one.miniature', function(username){
    var user_id = Meteor.users.findOne({username: username})._id;
    return Publications.find({$and: [{"owner.id": user_id}, {"url": {$exists:true, $ne: null}}]}, {fields: Fields.image.miniature});
});

Meteor.publish('publication.me.none', function () {
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    return Publications.find({$and:[{"owner.id": user_id}, {"url": {$exists:false}}]}, {fields: Fields.publication.none});
});

Meteor.publish('publication.one.none', function (username) {
    var user_id = Meteor.users.findOne({username: username})._id;
    return Publications.find({$and:[{"owner.id": user_id}, {"url": {$exists:false}}]}, {fields: Fields.publication.none});
});


Meteor.publish('publication.user.none', function (usernameUser) {
    var user = Meteor.users.find({'username':usernameUser});
    var user_id = user._id;
    if (!user_id) {
        this.ready();
        return;
    }
    return Publications.find({$and:[{owner: user_id}, {"url": {$exists:false}}]}, {fields: Fields.publication.none});
});

Meteor.publish("findBio", function () {
    return Meteor.users.find(this.userId);
});


Meteor.publish('publication.followed.all', function () {
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    var followed = Meteor.users.findOne(user_id, {fields: Fields.user.followed});
    var followed_id = followed.followed;
    return Publications.find({$and:[{"owner.id": {"$in": followed_id}}, {"url": {$exists:false}}]}, {fields: Fields.publication.all});
});
Meteor.publish('image.one', function(img_id){
    return Publications.find({$and: [{_id: img_id}, {"url": {$exists:true, $ne: null}}]}, {fields: Fields.image.all});
});

Meteor.publish("findUser", function(username) {
    return Meteor.users.findOne({"username": username}, { fields: { "username": 1 } } );
});

Meteor.publish('user.all.username', function () {
    return Meteor.users.find({}, {fields: Fields.user.username});
});

Meteor.publish('publication.someone.all', function (publicationId) {
    return Publications.find(publicationId, {fields: Fields.publicationOrImage.all});
});

Meteor.publish('publication.tagged.all', function () {
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    return Publications.find({$and:[{playersTagged: {$elemMatch: {id: user_id}}}, {"url": {$exists:false}}]}, {fields: Fields.publication.all});
});

Meteor.publish('publication.tagged.one.all', function (username) {
    var user_id =  Meteor.users.findOne({username: username})._id;
    return Publications.find({$and:[{playersTagged: {$elemMatch: {id: user_id}}}, {"url": {$exists:false}}]}, {fields: Fields.publication.all});
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

/**
 * Publicación que conllevan las publicaciones propias y de los seguidores (para la
 * implementación del scroll infinito).
 */
Meteor.publish('publication.me.followed.all', function () {
    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    Counts.publish(this, 'all-publications', Publications.find(), {
        noReady: true
    });
    var followed = Meteor.users.findOne(user_id, {fields: Fields.user.followed});
    var followed_id = followed.followed;
    return Publications.find({$and:[{$or: [{"owner.id": {"$in": followed_id}},{"owner.id": user_id}]}, {"url": {$exists:false}}]}, {fields: Fields.publication.all});
});

/**
 * Publicación que conllevan las publicaciones propias y en las que está etiquetado el usuario pasado por parámetro (para la
 * implementación del scroll infinito).
 */
Meteor.publish('publication.one.tagged.all', function (username) {
    var user = Meteor.users.findOne({username: username});
    var user_id = user._id;
    Counts.publish(this, 'all-publications-profile', Publications.find(), {
        noReady: true
    });
    return Publications.find({$and:[{$or: [{"owner.id": user_id},  {playersTagged: {$elemMatch: {id: user_id}}}]}, {"url": {$exists:false}}]}, {fields: Fields.publication.all});
});

Meteor.publish(null, function() {
    return Meteor.users.find({_id: this.userId}, {fields: Fields.user.all});
});

Meteor.publish("user.following", function(username){
   var user = Meteor.users.findOne({username: username});
    if(user){
        return Meteor.users.find({
            followers: user._id
        }, Fields.user.followingList);
    }else{
        throw new Meteor.Error( 500, 'User does not exist with username: '+username );
    }
});

Meteor.publish("user.followers", function(username){
    var user = Meteor.users.findOne({username: username});
    if(user){
        return Meteor.users.find({
            _id: {$in: user.followers}
        }, Fields.user.followingList);
    }else{
        throw new Meteor.Error( 500, 'User does not exist with username: '+username );
    }
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
            status: 1,
            avatar: 1,
            private_profile: 1,
            requestsFollow: 1,
            notifications: 1
        },
        profile: {
            _id: 1,
            username: 1,
            bio: 1,
            followed: 1,
            followers: 1,
            avatar: 1,
            private_profile: 1,
            requestsFollow: 1
        },
        followed: {
            followed: 1
        },
        username: {
            username: 1
        },
        followingList: {
            _id: 1,
            username: 1,
            followers: 1,
            avatar: 1,
            private_profile: 1,
            requestsFollow: 1
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
            comments: 1,
            images: 1
        },
        none: {
            _id: 1,
            owner: 1
        }
    },
    image: {
        miniature: {
            _id: 1,
            owner: 1,
            url: 1,
            createdAt: 1,
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
            comments: 1,
            publication: 1
        }
    },
    publicationOrImage: {
        all: {
            _id: 1,
            owner: 1,
            url: 1,
            createdAt: 1,
            playersTagged: 1,
            description: 1,
            playersLike: 1,
            playersDislike: 1,
            comments: 1,
            publication: 1,
            images: 1
        }
    }
};