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
    },
    uploadingImages: function(){
        return Session.get("uploadingImages");
    },
    numImagesUploaded: function(){
        return Session.get("numImagesUploaded");
    },
    numImagesToUpload: function(){
        return Session.get("numImagesToUpload");
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
            if(ImagesLocals.find({}).fetch().length != 0 && !uploadingImages()) {
                $("#new-publication-card").css("cursor","wait");
                msg = TAPi18n.__('images.uploading')+'&nbsp;&nbsp;<i class="fa fa-cloud-upload" aria-hidden="true"></i>';
                Toasts.throw(msg);
                Session.set("uploadingImages", true);
                var images = ImagesLocals.find({}).fetch();
                Session.set("numImagesToUpload", images.length);
                Session.set("numImagesUploaded", 0);
                Session.set("imagesId", []);
                _.each(images, function (img) {
                    var img_file = Util.dataURItoFile(img);
                    S3.upload({
                        file: img_file,
                        path: "users"
                    }, function (e, r) {
                        var numImagesUploaded = Session.get("numImagesUploaded");
                        Session.set("numImagesUploaded", numImagesUploaded + 1);
                        var data = {
                            url: r.url,
                            description: img.description,
                            usernameTagged: img.usernameTagged
                        };
                        Meteor.call("image.new", data, function (e, r) {
                            if (!e){
                                console.log("lo que devuelve el method de guardar imagen: "+r);
                                var imagesId = Session.get("imagesId");
                                console.log("lo que hay en el array de id's: "+imagesId);
                                imagesId = _.extend([], imagesId);
                                console.log("lo que hay en el array de id's despues de extend: "+imagesId);
                                imagesId.push(r);
                                console.log("lo que hay en el array de id's despues de push: "+imagesId);
                                Session.set("imagesId", imagesId);
                                console.log("lo que hay en el array de id's despues de guardar: " + Session.get("imagesId"));
                            } else {
                                console.log(e);
                            }
                        });
                    });
                });
                Tracker.autorun(function () {
                    var numImagesUploaded = Session.get("numImagesUploaded");
                    var numImagesToUpload = Session.get("numImagesToUpload");
                    var imagesFinished = Session.get("images.finished");
                    if (!imagesFinished && numImagesUploaded!=false && numImagesToUpload!=false && numImagesToUpload === numImagesUploaded) {
                        Toasts.throwTrans("images.uploaded_finished");
                        $("#new-publication-card").css("cursor","auto");
                        Session.set("uploadingImages", false);
                        Session.set("numImagesUploaded", false);
                        Session.set("numImagesToUpload", false);
                        Session.set("images.finished", true);
                        var ImagesId = Session.get("imagesId");
                        Meteor.call('publication.new', publication, usernamesTagged, ImagesId, function(err, response) {
                            if (!err){
                                var textarea = document.getElementById('newPublication');
                                textarea.value = "";
                                $("#newPublication").trigger('autoresize');
                                $("#post-label").removeClass("active");
                                Session.set("imagesId", false);
                                ImagesLocals.remove({});
                            }
                        });
                    }
                })
            } else {
                Meteor.call('publication.new', publication, usernamesTagged, [], function(err, response) {
                    if (!err){
                        var textarea = document.getElementById('newPublication');
                        textarea.value = "";
                        $("#newPublication").trigger('autoresize');
                        $("#post-label").removeClass("active");
                        Session.set("imagesId", false);
                    }
                });
            }
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

function uploadingImages(){
    return Session.get("uploadingImages");
}