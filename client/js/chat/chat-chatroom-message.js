Template.chat_chatroom_message.helpers({
    from: function(){
        var my_id = Meteor.userId();
        if(this.player==my_id){
            return "my";
        }else{
            return "his";
        }
    }
});