Template.images_avatar.helpers({
    avatarURL: function(){
        return Session.get(this.user_id+".avatar");
    },
    size: function(){
        var size = this.max_size;
        if(size == undefined){
            return "150px";
        }else{
            return size;
        }
    }
});

Template.images_avatar.onRendered(function(e){
    var user_id = this.data.user_id;
    Meteor.call("findAvatarByUser", user_id, function(e,r){
        if(e){
            console.log(e);
        }else{
            Session.set(user_id+".avatar", r);
        }
    });
});