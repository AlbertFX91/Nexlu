Template.images_preview_edit.helpers({
    img: function(){
        var id = Session.get("img-prev-edit-id");
        var result = ImagesLocals.findOne(id);
        return result;
    },
    editing_description: function(){
        return Session.get("img-prev-edit-description");
    }
});

//SOURCE: http://tutorialzine.com/2013/02/instagram-filter-app/
Template.images_preview_edit.onRendered(function(e){
    Session.set("img-prev-edit-description", false);
    $("#filterContainer").find('ul').on('mousewheel',function(e, delta){
        this.scrollLeft -= (delta * 50);
        e.preventDefault();

    });


    //En esta parte vamos a mostrar la imagen para que no se deforme y se ajuste en función del dispositivo

    //Obtenemos los valores de la pantalla
    var availHeight = window.screen.availHeight;
    var availWidth = window.screen.availWidth;

    //Ajustamos el tamaño máximo que tendra la imagen
    var maxWidth = availWidth - 0.7*availWidth;
    var maxHeight = availHeight - 0.7*availHeight;

    var _URL = window.URL || window.webkitURL;
    var img_id = Session.get("img-prev-edit-id");
    var image = ImagesLocals.findOne(img_id);
    var file = dataURItoFile(image);

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

       $("#img-edit-"+img_id).css({
            width: newWidth,
            height: newHeight
        });

    };

    //Este metodo luego invocará el metodo definido anteriormente onload
    img.src = _URL.createObjectURL(file);


});


Template.images_preview_edit.events({
    "click #filters>li>a": function(e){
        var filter = $(e.target).attr("id");
        var img_id = Session.get("img-prev-edit-id");
        Caman("#img-edit-"+img_id, function () {
            this.revert(false);
            if(filter!="" && filter!="normal") this[filter]();
            this.render();
            Session.set("filter-apply", filter);
        });
    },
    "click #show-filters": function(e){
        var div = $("#filters-div")
        if(div.css("display")=="none"){
            $("#filters-div").css("display", "block");
        }else{
            //div.addClass("fadeOutDown");
            div.removeClass("fadeInUp").addClass("fadeOutDown");
            setTimeout(function(){
                div.css("display","none").removeClass("fadeOutDown").addClass("fadeInUp");
            }, 800);
        }
    },
    "click #edit-img-description-icon": function () {
        Session.set("img-prev-edit-description", true);
    },
    "click #img-edit-description-save": function() {
        var description = document.getElementById("img-edit-description-input").value;
        var id = Session.get("img-prev-edit-id");
        if(description.length==0){
            Errors.throwErrorTranslated("error.description_empty");
        }else{
            ImagesLocals.update(id, {
                $set: { description: description }
            });
            Session.set("img-prev-edit-description", false);
            Toasts.throwTrans("toast.description_added");
        }
    }
});


//SOURCE: http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata y adaptado a Meteor
function dataURItoFile(img) {
    var dataURI = img.result;
    var type = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new File([new Uint8Array(array)], img.name, {type: type});
}