Template.chat_chatroom.onRendered(function(){
    $("#chatroom-body").niceScroll();
    Meteor.subscribe("chatroom.mine");
});

Template.chat_chatroom.events({
    'click #chat-chatroom-close-button': function(){
        $("#chatroom-container").removeClass("fadeInUp").addClass("fadeOutDown");
        setTimeout(function(){
            Session.set("ChatRoom.id", null);
        }, 1000);
    }
});

Template.chat_chatroom.helpers({
    chatroom: function (){
        var chatRoomId = Session.get("ChatRoom.id");
        return ChatRooms.findOne(chatRoomId);
    },
    messages: function (){
        var chatRoomId = Session.get("ChatRoom.id");
        return ChatRooms.findOne(chatRoomId).messages;
    }
});