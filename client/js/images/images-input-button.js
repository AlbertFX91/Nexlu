Template.images_input_button.onRendered(function(){

});

Template.images_input_button.events({
    "click #button-show-input-modal": function(e){
        e.preventDefault();

        //Vaciamos las imagenes del navegador
        ImagesLocals.remove({});

        Session.set("uploadingImages", false);
        Session.set("numImagesUploaded", false);
        Session.set("numImagesToUpload", false);
        Session.set("images.finished", false);
        Session.set("by-new-pub", false);
        $('#input-images-modal').openModal({dismissible: false});

    }
});