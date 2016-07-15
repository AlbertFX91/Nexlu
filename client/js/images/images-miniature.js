Template.images_miniature.events({
    'click .img-miniature': function(e){
        var img_id = $(e.target).attr("data-id");
        Router.go('images_show', {_id: img_id});
    }
});