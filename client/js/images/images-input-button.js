Template.images_input_button.onRendered(function(){

});

Template.images_input_button.events({
    "click #button-show-input-modal": function(e){
        e.preventDefault();
        $('#input-images-modal').openModal({dismissible: false});
    }
});