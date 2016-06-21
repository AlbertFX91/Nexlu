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

function dataURItoFile(img) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var dataURI = img.result;
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new File([ia], img.name, {type: mimeString});
}