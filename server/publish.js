Meteor.publish('myPublications', function () {
Meteor.publish('user.me', function () {

    var user_id = this.userId;
    if (!user_id) {
        this.ready();
        return;
    }
    return Publications.find({"owner": user_id});
});

Meteor.publish("allUsers", function () {
    return Meteor.users.find({});
});
    return Meteor.users.find(user_id, {
        fields: Fields.user.all
    });
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
            friends: 1,
        }
    }
}