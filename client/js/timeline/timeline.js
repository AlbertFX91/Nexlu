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
        var valido = true;
        if (description.trim() == ""){
            var texto = TAPi18n.__("error.post-notBlank");
            document.getElementById('post-error').innerHTML = texto;
            $("#post-label").removeClass("active");
            valido = false;
        }
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
        if (valido) {
            Meteor.call('postPublication', publication, function(err, response) {
                if (!err){
                    var textarea = document.getElementById('newPublication');
                    textarea.value = "";
                    $("#newPublication").trigger('autoresize');
                    $("#post-label").removeClass("active");
                }
            });
        }
    },
    'click #newPublication': function(e) {
        e.preventDefault();
        document.getElementById('post-error').innerHTML = "";
    }
})
