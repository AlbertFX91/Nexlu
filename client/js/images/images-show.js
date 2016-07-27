Template.images_show.helpers({
    tagged_pretty: function(){
        return Prettify.compactTags(this.playersTagged);
    },
    isMine: function() {
        if (this.owner[0].id.trim() === Meteor.userId().trim())
            return true;
        return false;
    },
    iLike: function() {
        return _.contains(this.playersLike, Meteor.userId().trim());
    },
    iDislike: function() {
        return _.contains(this.playersDislike, Meteor.userId().trim());
    },



    // TODO: Esto hay que hacerlo en el lado del server (methods):
    listLikes: function(likes){
        var likes_username = _.map(likes, function(id){
            var user = Meteor.users.findOne(id, {fields:{username:1}});
            return user.username;
        } )
        return likes_username; // lista con los usernames de los usuarios que le dieron like.
    },
    listDislikes: function(dislikes){
        var dislikes_username = _.map(dislikes, function(id){
            var user = Meteor.users.findOne(id, {fields:{username:1}});
            return user.username;
        } )
        return dislikes_username; // lista con los usernames de los usuarios que le dieron dislikes.
    }
});

Template.images_show.events({
    'click #edit-pub': function () {
        $('#edit-pub-modal').openModal({complete:function(){
            document.getElementById('edit-post-error').innerHTML = "";
        }})
        var textarea = document.getElementById('editPublication');
        textarea.value = this.description;
        $("#editPublication").trigger('autoresize');
        $("#edit-post-label").addClass("active");
    },
    'click #remove-pub': function () {
        $('#remove-pub-modal').openModal();
    },
    'submit .edit-post': function(e) {
        e.preventDefault();
        var description = document.getElementById('editPublication').value;
        var publicationId = this._id;
        var valido = true;
        //var playersTagged: [], //TODO: Añadir etiquetas
        if (description.trim() == ""){
            var texto = TAPi18n.__("error.post-notBlank");
            document.getElementById('edit-post-error').innerHTML = texto;
            $("#edit-post-label").removeClass("active");
            valido = false;
        } else if (description.length > 5000) {
            var texto = TAPi18n.__("error.post-maxlength");
            document.getElementById('edit-post-error').innerHTML = texto;
            $("#edit-post-label").hide();
            valido = false;
        }
        if (valido) {
            Meteor.call('image.edit', publicationId, description, function(err, response){
                if (!err){
                    $('#edit-pub-modal').closeModal();
                }
            });
        }
    },
    'click #editPublication': function(e) {
        e.preventDefault();
        document.getElementById('edit-post-error').innerHTML = "";
        $("#edit-post-label").show();
    },
    'submit .remove-post': function(e) {
        e.preventDefault();
        var publicationId = this._id;
        Meteor.call('image.remove', publicationId, function(err, response){
            if (!err){
                $('#remove-pub-modal').closeModal();
                $('.lean-overlay').remove();
                Router.go("home");
            }
        });
    },
    'click #like': function (e) {
        e.preventDefault();
        var publicationId = this._id;
        if (!_.contains(this.playersLike, Meteor.userId())){
            Meteor.call('image.like', publicationId, function(err, response){
                if(err){
                    console.log(err);
                }
            });
        }
    },
    'click #dislike': function (e) {
        e.preventDefault();
        var publicationId = this._id;
        if (!_.contains(this.playersDislike, Meteor.userId())){
            Meteor.call('image.dislike', publicationId, function(err, response){
                if(err){
                    console.log(err);
                }
            });
        }
    },
    'click #i-like': function (e) {
        e.preventDefault();
        var publicationId = this._id;
        if (_.contains(this.playersLike, Meteor.userId())){
            Meteor.call('image.remove.like', publicationId, function(err, response){
                if(err){
                    console.log(err);
                }
            });
        }
    },
    'click #i-dislike': function (e) {
        e.preventDefault();
        var publicationId = this._id;
        if (_.contains(this.playersDislike, Meteor.userId())){
            Meteor.call('image.remove.dislike', publicationId, function(err, response){
                if(err){
                    console.log(err);
                }
            });
        }
    },


    'click .publication-image-img': function(e){
        $('#publication-image-modal').openModal();
    }

});

Template.images_show.onRendered(function (){
    if(this.data == null){
        Router.go('home');
    }

    //En esta parte vamos a mostrar la imagen para que no se deforme y se ajuste en función del dispositivo

    //Obtenemos los valores de la pantalla
    var availHeight = window.screen.availHeight;
    var availWidth = window.screen.availWidth;

    //Ajustamos el tamaño máximo que tendra la imagen
    var maxWidth = availWidth - 0.5*availWidth;
    var maxHeight = availHeight - 0.5*availHeight;

    var _URL = window.URL || window.webkitURL;
    var img_id = this.data._id;
    //Creamos un objeto de tipo Image para poder obtener el width y el height de la imagen
    var img = new Image();
    img.onload = function() {
        imgWidth  = this.width;
        imgHeight = this.height;
        // Calculate the new image dimensions, so they fit
        // inside the maxWidth x maxHeight bounding box

        if (imgWidth >= maxWidth || imgHeight >= maxHeight) {

            // The image is too large,
            // resize it to fit a 500x500 square!

            if (imgWidth > imgHeight) {

                // Wide
                ratio = imgWidth / maxWidth;
                newWidth = maxWidth;
                newHeight = imgHeight / ratio;

            } else {

                // Tall or square
                ratio = imgHeight / maxHeight;
                newHeight = maxHeight;
                newWidth = imgWidth / ratio;

            }

        } else {
            newHeight = imgHeight;
            newWidth = imgWidth;
        }
        $("#img-"+img_id).css({
            width: newWidth,
            height: newHeight
        });

    };

    //Este metodo luego invocará el metodo definido anteriormente onload
    img.src = this.data.url;


});