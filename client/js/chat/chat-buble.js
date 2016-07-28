Template.chat_buble.events({
   "click #chat-buble-open-chat": function(){

       $("#chat-list-container").removeClass("fadeOutDown").addClass("fadeInUp").css("display","block");
       var chatNotification = $("#chat-buble-notification");
       if(chatNotification.css("display")=="block"){
           chatNotification.css("display","none");
       }

   }
});