Template.chat.helpers({
   currentChatRoom: function(){
       return Session.get("ChatRoom.id")!=null;
   }
});