Template.chat_chatroom.onRendered(function(){
    $("#chatroom-body").niceScroll();
});

Template.chat_chatroom.events({
    'click #chat-chatroom-close-button': function(){
        $("#chatroom-container").removeClass("fadeInUp").addClass("fadeOutDown");
        setTimeout(function(){
            Session.set("ChatRoom.id", null);
        }, 1000);
    }
});

