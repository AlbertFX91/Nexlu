Template.images_avatar.helpers({
    avatarURL: function(){
        var user = Meteor.user();
        if(user.avatar == undefined){
            return "https://s3-us-west-2.amazonaws.com/nexlu/logo-justified.png";
        }else{
            return user.avatar.url;
        }
    },
    size: function(){
        var size = this.tam;
        if(size == undefined){
            return "150px";
        }else{
            return size;
        }
    }
})