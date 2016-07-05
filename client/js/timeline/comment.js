Template.comment.helpers({
    username: function(){
        return ReactiveMethod.call('getUsernameById', this.player, function(err, response){
            if(err){
                console.log(err);
            }
        });
    }
});