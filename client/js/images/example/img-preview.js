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
    }
});


Template.img_preview.helpers({
    "images": function(){
        return ImagesLocals.find();
    }

});