Template.images_carousel.helpers({
    id: function() {
        return this.toString();
    },
    url:function() {
        return ReactiveMethod.call('getUrlByImageId', this.toString(), function(err, response){
            if(err){
                console.log(err);
            }
        });
    }
});