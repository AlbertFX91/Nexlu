Template.images_input.onRendered(function(){

});

Template.images_input.events({
    "click #button-show-input-modal": function(e){
        e.preventDefault();
        $('#input-images-modal').openModal({dismissible: false});
    }
});