Template.images_avatar.helpers({
    avatarURL: function(){
        return ReactiveMethod.call("findAvatarByUser", this.user_id);
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