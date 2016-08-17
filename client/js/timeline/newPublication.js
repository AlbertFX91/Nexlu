Template.newPublication.helpers({
    settingsTextarea: function () {
        return {
            position: top,
            limit: 5,
            rules: [
                {
                    token: '@',
                    collection: Meteor.users,
                    field: 'username',
                    options: '',
                    template: Template.userPill,
                    noMatchTemplate: Template.notMatch
                }
            ]
        }
    },
    images_selected: function () {
        return ImagesLocals.find({}).fetch().length;
    }
});

Template.newPublication.events({
    'submit .confirm-post': function(e) {
        e.preventDefault();
        var description = document.getElementById('newPublication').value;
        var descriptionTrim = description.trim();
        var userId = Meteor.userId();
        var username = Meteor.user().username;
        var valido = true;
        if (descriptionTrim == ""){
            var texto = TAPi18n.__("error.post-notBlank");
            document.getElementById('post-error').innerHTML = texto;
            $("#post-label").removeClass("active");
            valido = false;
        } else if (descriptionTrim.length > 5000) {
            var texto = TAPi18n.__("error.post-maxlength");
            document.getElementById('post-error').innerHTML = texto;
            $("#post-label").hide();
            valido = false;
        }

        //Comprobación del etiquetado con '@'
        var usernamesTagged = Util.validateTag(descriptionTrim);

        var publication = {
            owner:{
                    id: userId,
                    username: username
                },
            createdAt: new Date(),
            playersTagged: [], //Se inicializa vacio y en servidor se modifica
            description: descriptionTrim,
            playersLike: [],
            playersDislike: [],
            comments: []
        };
        if (valido) {
            Meteor.call('publication.new', publication, usernamesTagged, function(err, response) {
                if (!err){
                    var textarea = document.getElementById('newPublication');
                    textarea.value = "";
                    $("#newPublication").trigger('autoresize');
                    $("#post-label").removeClass("active");
                    Session.set("by-new-pub", false); //TODO:
                }
            });
        }
    },
    'click #newPublication': function(e) {
        e.preventDefault();
        $("#post-label").show();
        document.getElementById('post-error').innerHTML = "";
    }
});

Template.newPublication.onRendered(function(){
    $('#newPublication').characterCounter();
    //Vaciamos las imagenes del navegador
    ImagesLocals.remove({});
});