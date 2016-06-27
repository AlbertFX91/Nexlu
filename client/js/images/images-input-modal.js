Template.images_input_modal.events({
    "click .close-modal-button": function(e){
        e.preventDefault();
        $("#input-images-modal").closeModal({
            complete: function(){
                //Vaciamos las imagenes del navegador
                ImagesLocals.remove({});
                Session.set("img-prev-edit-id",false);
            }
        });

    },
    "change #image-upload": function(e){
        //Obtenemos los ficheros seleccionados
        var files = $(e.target)[0].files;
        //Para cada fichero, almacenamos el fichero en el navegador
        _.each(files, saveImgInBrowserByFile);
    },
    "mouseenter .img-preview-element": function(e) {
        var img = $(e.target)
        if (img.hasClass("animated")) {
            img.removeClass("animated");
            img.removeClass("bounceIn");
        }
        $(e.target).children(".img-preview-options").addClass("img-preview-options-show");
    },
    "mouseleave .img-preview-options": function(e){
        $(e.target).removeClass("img-preview-options-show");
    },

    "click .img-preview-remove": function(e){
        var x = $(e.target)
        //Recuperamos el id del div donde se está llamando al evento
        var img_div = x.parent().parent().next();
        //El id es img-preview-IdDeLaImagen. Por lo que recuperamos el IdDeLaImagen
        var img_id = img_div[0].id.split("-")[2];
        //Eliminamos la imagen de la collection local
        ImagesLocals.remove(img_id);
    },

    "click .img-preview-edit": function(e){
        var x = $(e.target)
        //Recuperamos el id del div donde se está llamando al evento
        var img_div = x.parent().parent().next();
        //El id es img-preview-IdDeLaImagen. Por lo que recuperamos el IdDeLaImagen
        var img_id = img_div[0].id.split("-")[2];

        Session.set("img-prev-edit-id", img_id);
    },

    "click #button-exit-edit": function(){
        Session.set("img-prev-edit-id", false);
    },

    //Source: http://stackoverflow.com/questions/15654031/saving-images-after-altering-them-by-camanjs-plugin
    //Lo que pretendemos es comprobar que se ha editado la imagen, y de ser así, vamos a guardar la imagen resultante en un atributo nuevo en la imagen.
    "click #button-save-img-edit": function(){
        var img_id = Session.get("img-prev-edit-id");
        //Se guarda en el template images_input_edit
        var filter = Session.get("filter-apply");
        if(filter!=""&&filter!="normal"){
            var canvas = document.getElementById("img-edit-"+img_id);
            var data = canvas.toDataURL();
            if(data==""){
                Errors.throwErrorTranslated("error.occurred")
            }else{
                ImagesLocals.update(img_id, {
                    $set: {
                        resultEdited: data
                    }
                });
            }
            Session.set("img-prev-edit-id", false);
        }
    }
});

Template.images_input_modal.helpers({
    noImages: function(){
        return ImagesLocals.find().count()==0;
    },
    images: function(){
        return ImagesLocals.find();
    },
    editing: function(){
        return Session.get("img-prev-edit-id");
    }
});


function saveImgInBrowserByFile(file){
    //Declaramos el objeto FileReader que usaremos para convertir el fichero en una URL para poder previsualizarlo y almacenarlo en la collection
    var reader = new FileReader();
    reader.onload = function (e){
        //Declaramos que una vez cargado un fichero, insertaremos en la collection local ImagesLocales los datos del fichero,
        //así como los datos del fichero en una url, y un atributo auxiliar que nos indicará si se ha subido o no
        var id = ImagesLocals.insert(_.extend({result: e.target.result, uploaded: false},file));

    };
    //Aquí leemos el fichero y se ejecutará la función onload una vez cargado
    reader.readAsDataURL(file);
}

Template.images_show_preview.helpers({
    img_data: function(){
        result = this.result;
        resultEdited = this.resultEdited;
        return resultEdited? resultEdited: result;
    }
});
