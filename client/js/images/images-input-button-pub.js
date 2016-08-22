Template.images_input_button_pub.onRendered(function(){

});

Template.images_input_button_pub.events({
    "click #button-show-input-modal": function(e){
        e.preventDefault();
        var uploading = Session.get("uploadingImages");
        if (!uploading) {
            Session.set("numImagesUploaded", false);
            Session.set("numImagesToUpload", false);
            Session.set("images.finished", false);
            Session.set("by-new-pub", true);
            $('#input-images-modal').openModal({dismissible: false});
        }
    }
});