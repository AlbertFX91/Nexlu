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
    },
    emojis: function(){
        return Emojis.find().fetch().slice(0,20*6);
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
                        var data = {
                            url: r.url,
                            description: img.description,
                            usernameTagged: img.usernameTagged
                        };
                        Meteor.call("image.new", data, function (e, r) {
                            if (!e){
                                var imagesId = Session.get("imagesId");
                                imagesId = _.extend([], imagesId);
                                imagesId.push(r);
                                Session.set("imagesId", imagesId);
                                Session.set("numImagesUploaded", numImagesUploaded + 1);
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
                        //Vaciamos el textarea, lo redimensionamos manualmente y desactivamos el label.
                        var textarea = document.getElementById('newPublication');
                        textarea.value = "";
                        $("#newPublication").trigger('autoresize');
                        $("#post-label").removeClass("active");
                        //Borramos el array de Id's de las imagenes seleccionadas.
                        Session.set("imagesId", false);
                        //cerramos la ventana de emoticonos si está abierta aún.
                        var picker = $("#pub-emoji-picker");
                        if(picker.css("display")=="block"){
                            picker.removeClass("fadeInUp").addClass("fadeOutDown");
                            setTimeout(function(){
                                picker.removeClass("fadeOutDown").css("display","none").addClass("fadeInUp");
                            }, 1000);
                        }
                    }
                });
            }
        }
    },
    'click #newPublication': function(e) {
        e.preventDefault();
        $("#post-label").show();
        document.getElementById('post-error').innerHTML = "";
    },
    'click span.emoji-picker': function(e){
        var emoji_id = $(e.target).parent().attr("data-id");
        var emoji = Emojis.findOne(emoji_id);
        $("#newPublication").val($("#newPublication").val()+":"+emoji.alias+":");
        $("#post-label").addClass("active");
    },
    'click #pub-input-options': function(){
        var picker = $("#pub-emoji-picker");
        if (picker.css("display")=="none") {
            picker.css("display", "block");
        }else if(picker.css("display")=="block"){
            picker.removeClass("fadeInUp").addClass("fadeOutDown");
            setTimeout(function(){
                picker.removeClass("fadeOutDown").css("display","none").addClass("fadeInUp");
            }, 1000);
        }
    }
});

Template.newPublication.onRendered(function(){
    Meteor.subscribe("emojis");
    $('#newPublication').characterCounter();
    //Vaciamos las imagenes del navegador
    ImagesLocals.remove({});
});

function uploadingImages(){
    return Session.get("uploadingImages");
}