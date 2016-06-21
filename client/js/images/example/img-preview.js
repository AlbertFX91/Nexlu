Template.img_preview.events({
    "change input.file_bag": function(e){
        var file = $(e.target)[0].files[0];
        console.log(file);
        //var id = ImagesLocals.insert(file);

        //console.log("ID: "+id);
/*
        $(".img-containers").append('<div class="col s1"><img src="#" alt=" " id="'+id+'" /></div>');

        var reader = new FileReader();
        reader.onload = function (e){
            $('#'+id).attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
 */     //readAsDataURL(ImagesLocals.findOne(id));
        var reader = new FileReader();
        reader.onload = function (e){
            var id = ImagesLocals.insert(_.extend({result: e.target.result},file));
            console.log("ID FILE: "+id);
            //$('#'+id).attr('src', e.target.result);
        };
        reader.readAsDataURL(file);
    },
    "click .img-prev": function(e){
        var img_id = $(e.target).attr('data-id');
        var img = ImagesLocals.findOne(img_id);
        var file = dataURItoFile(img);
        S3.upload({
            file: file,
            path:"users"
        },function(e,r){
            console.log(r);
        });
    }
});


Template.img_preview.helpers({
    "images": function(){
        return ImagesLocals.find();
    }

});


//http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
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