Template.chat_menu.onRendered(function(){
    Session.set("ChatRoom.id", null);
    $("#chat-list-body").niceScroll();
    Meteor.subscribe("user.each.chat");

    /*Meteor.subscribe("chatroom.mine");
    var handle = ChatRooms.find({"players.id": Meteor.userId()}).observeChanges({
        changed: function(id, fields){
            //Recupero todos los mensajes del chatroom modificado
            var messages = _.sortBy(fields.messages, function(m){return m.createdAt});
            //Recupero el ultimo mensaje para comprobar que el mensaje no lo he enviado yo, sino que lo he recibido.
            var lastMessage = messages[messages.length-1];
            if(lastMessage.player != Meteor.userId()){
                var chatroom_id = Session.get("ChatRoom.id");
                var chatOpen = chatroom_id !=undefined && chatroom_id == id;

                if(!chatOpen){
                    var player_id = lastMessage.player;
                    $("#chat-menu-user-"+player_id).children(".new-message-container").addClass("new");
                }
            }
        }
    })
    */
});

Template.chat_menu.events({
    "click #chat-list-close-button": function(){
        $("#chat-list-container").removeClass("fadeInUp").addClass("fadeOutDown");
        /*Session.set("ChatRoom.id", null);*/
    }
});

Template.chat_menu.helpers({
    "users": function(){
        return Meteor.users.find({_id: {$ne: Meteor.userId()}});
    }
});