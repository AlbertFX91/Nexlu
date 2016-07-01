Template.timeline.helpers({
    publications: function () {
        return Publications.find({},{sort: {createdAt: -1}});
    }
});

Template.timeline.events({
    'submit .confirm-post': function(e) {
        e.preventDefault();
        var description = document.getElementById('newPublication').value;
        var userId = Meteor.userId();
        var username = Meteor.user().username;

        var publication = {
            owner: [
                {
                    id: userId,
                    username: username
                }
            ],
            createdAt: new Date(),
            playersTagged: [], //TODO: Añadir etiquetas
            description: description,
            playersLike: [],
            playersDislike: [],
            comments: []
        };
        //Meteor.call('postPublication', publication);
    }
})