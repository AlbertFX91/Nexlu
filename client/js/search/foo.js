Template.foo.helpers({
    settings: function() {
        console.log(Meteor.users);
        return {
            position: "down",
            limit: 5,
            rules: [
                {
                    collection: Meteor.users, //TODO Mostrar todos los usuarios.
                    field: "username",
                    template: Template.userPill
                }
            ]
        };
    }
});