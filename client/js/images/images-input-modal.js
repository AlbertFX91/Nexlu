Template.images_input_modal.events({
    "click .close-modal-button": function(e){
        e.preventDefault();
        $("#input-images-modal").closeModal();
    },
    "change #image-upload": function(e){
        //Obtenemos los ficheros seleccionados
        var files = $(e.target)[0].files;
        //Para cada fichero, almacenamos el fichero en el navegador
        _.each(files, saveImgInBrowserByFile);
    }
});

Template.images_input_modal.helpers({
    noImages: function(){
        return ImagesLocals.find().count()==0;
    },
    images: function(){
        return ImagesLocals.find();
    }
});


function saveImgInBrowserByFile(file){
    //Declaramos el objeto FileReader que usaremos para convertir el fichero en una URL para poder previsualizarlo y almacenarlo en la collection
    var reader = new FileReader();
    reader.onload = function (e){
        //Declaramos que una vez cargado un fichero, insertaremos en la collection local ImagesLocales los datos del fichero,
        //así como los datos del fichero en una url, y un atributo auxiliar que nos indicará si se ha subido o no
        var id = ImagesLocals.insert(_.extend({result: e.target.result, uploaded: false},file));
        Toasts.throw("Img loaded in your browser!",1000);

    };
    //Aquí leemos el fichero y se ejecutará la función onload una vez cargado
    reader.readAsDataURL(file);
}