Template.images_input_button.onRendered(function(){

});

Template.images_input_button.events({
    "click #button-show-input-modal": function(e){
        e.preventDefault();
        Session.set("uploadingImages", false);
        Session.set("numImagesUploaded", false);
        Session.set("numImagesToUpload", false);
        Session.set("images.finished", false);
        $('#input-images-modal').openModal({dismissible: false});
    }
});