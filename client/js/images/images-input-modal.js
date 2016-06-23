Template.images_input_modal.events({
    "click .close-modal-button": function(e){
        e.preventDefault();
        console.log("HI!");
        $("#input-images-modal").closeModal();
    }
});

Template.images_input_modal.helpers({
    noImages: function(){
        return ImagesLocals.find().count()==0;
    }
});
