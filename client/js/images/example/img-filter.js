/**
 * Created by Albert_FX on 21/06/2016.
 */
Template.img_filter.events({
    "change input.file_bag": function(e){
        //Obtenemos el fichero del input
        ImagesLocals.remove({});
        var file = $(e.target)[0].files[0];

        //Declaramos el objeto FileReader que usaremos para convertir el fichero en una URL para poder previsualizarlo y almacenarlo en la collection
        var reader = new FileReader();
        reader.onload = function (e){
            //Declaramos que una vez cargado un fichero, insertaremos en la collection local ImagesLocales los datos del fichero,
            //así como los datos del fichero en una url, y un atributo auxiliar que nos indicará si se ha subido o no
            var id = ImagesLocals.insert(_.extend({result: e.target.result, uploaded: false},file));
            $("#filterContainer").css("display", "block");
            Toasts.throw("Img loaded in your browser!",5000);

        };
        //Aquí leemos el fichero y se ejecutará la función onload una vez cargado
        reader.readAsDataURL(file);
    },
    "click .img-prev.img-ready": function(e){
        //recuperamos la imagen de la collection local a traves de la id que le hemos añadido al nodo
        var img_id = $(e.target).attr('data-id');
        var img = ImagesLocals.findOne(img_id);
        //Convertimos la imagen en un tipo fichero, para poder hacer el upload mediante S3
        var file = dataURItoFile(img);
        //Realizamos la subida a S3
        S3.upload({
            file: file,
            path:"users"
        },function(e,r){
            Toasts.throw("Image uploaded! click &nbsp;<a href='"+r.url+"' target='blank' />here</a>&nbsp;", 10000);
            //Modificamos la imagen para que ahora result almacene la url de la imagen, no sus datos como url ya que entonces ocuparía mucho espacio
            //Asignamos uploaded = true para evitar que se vuelva a almacenar la misma imagen en S3
            ImagesLocals.update(img_id, {$set: {result: r.url, uploaded: true}});
            //console.log(r);
        });
    },

    /*"click .apply-filter": function(e){
     var image = ImagesLocals.find().fetch()[0];
     var img_id = image._id;
     Caman("#"+img_id, function () {
     this["sunrise"]();
     this.render();
     });
     },*/
    "click #filters>li>a": function(e){
        var filter = $(e.target).attr("id");
        var image = ImagesLocals.find().fetch()[0];
        var img_id = image._id;
        Caman("#"+img_id, function () {
            this.revert(false);
            if(filter!="" && filter!="normal") this[filter]();
            this.render();
        });


    }
});


Template.img_filter.helpers({
    "images": function(){
        return ImagesLocals.find();
    }

});

Template.img_filter.onRendered(function(){
    $("#filterContainer").find('ul').on('mousewheel',function(e, delta){

        this.scrollLeft -= (delta * 50);
        e.preventDefault();

    });
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