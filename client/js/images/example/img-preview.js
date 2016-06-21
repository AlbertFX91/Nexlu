Template.img_preview.events({
    "change input.file_bag": function(e){
        var file = $(e.target)[0].files[0];
        var reader = new FileReader();
        reader.onload = function (e){
            var id = ImagesLocals.insert(_.extend({result: e.target.result, uploaded: false},file));
            Toasts.throw("Img loaded in your browser!",5000);

        };
        reader.readAsDataURL(file);
    },
    "click .img-prev.img-ready": function(e){
        var img_id = $(e.target).attr('data-id');
        var img = ImagesLocals.findOne(img_id);
        var file = dataURItoFile(img);
        S3.upload({
            file: file,
            path:"users"
        },function(e,r){
            Toasts.throw("Image uploaded! click &nbsp;<a href='"+r.url+"' target='blank' />here</a>&nbsp;", 10000);
            ImagesLocals.update(img_id, {$set: {result: r.url, uploaded: true}});
            //console.log(r);
        });
    }
});


Template.img_preview.helpers({
    "images": function(){
        return ImagesLocals.find();
    }

});


//SOURCE: http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
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