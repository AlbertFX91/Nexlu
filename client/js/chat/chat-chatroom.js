Template.chat_chatroom.onRendered(function(){
    $("#chatroom-body").niceScroll();
    Meteor.subscribe("chatroom.mine");
    Meteor.subscribe("emojis");
    Session.set("user.status","offline");
    setTimeout(function(){
        scrollDown();
    }, 500);
});

Template.chat_chatroom.events({
    'click #chat-chatroom-close-button': function(){
        $("#chatroom-container").removeClass("fadeInUp").addClass("fadeOutDown");
        setTimeout(function(){
            Session.set("ChatRoom.id", null);
        }, 1000);
    },
    'click #chatroom-input-options': function(){
        var picker = $("#chatroom-emoji-picker");
        if (picker.css("display")=="none") {
            picker.css("display", "block");
        }else if(picker.css("display")=="block"){
            picker.removeClass("fadeInUp").addClass("fadeOutDown");
            setTimeout(function(){
                picker.removeClass("fadeOutDown").css("display","none").addClass("fadeInUp");
            }, 1000);
        }
    },
    'click span.emoji-picker': function(e){
        var emoji_id = $(e.target).parent().attr("data-id");
        var emoji = Emojis.findOne(emoji_id);
        $("#message-input").val($("#message-input").val()+":"+emoji.alias+":");
    },

    'click #chatroom-input-save': function(e){
        sendMessage();
    },


    'submit #message-input-form': function(e){
        e.preventDefault();
        sendMessage();
    }
});

function sendMessage(){
    var messageToSend =  $("#message-input").val();
    if(messageToSend.length!=0){
        var chatroom_id = Session.get("ChatRoom.id");
        Meteor.call("chatroom.send", chatroom_id, messageToSend, function(e, r){
            if(r){
                var picker = $("#chatroom-emoji-picker");
                if(picker.css("display")=="block"){
                    picker.removeClass("fadeInUp").addClass("fadeOutDown");
                    setTimeout(function(){
                        picker.removeClass("fadeOutDown").css("display","none").addClass("fadeInUp");
                    }, 1000);
                }
                $("#message-input").val("");
                scrollDown();
            }
        });
    }
}

Template.chat_chatroom.helpers({
    chatroom: function (){
        var chatRoomId = Session.get("ChatRoom.id");
        return ChatRooms.findOne(chatRoomId);
    },
    messages: function (){
        var chatRoomId = Session.get("ChatRoom.id");
        var chatroom = ChatRooms.findOne(chatRoomId);
        if(chatroom == undefined){return undefined}
        return _.sortBy(chatroom.messages, function(m){return m.createdAt});
    },
    username: function(){
        var chatRoomId = Session.get("ChatRoom.id");
        var chatRoom =  ChatRooms.findOne(chatRoomId);
        if(chatRoom == undefined){return undefined}
        var userId = Meteor.userId();
        var username = _.find(chatRoom.players, function(player){return player.id!=userId}).username;
        return username;
    },
    userStatus: function(){
        var chatRoomId = Session.get("ChatRoom.id");
        var chatRoom =  ChatRooms.findOne(chatRoomId);
        if(chatRoom == undefined){return undefined}
        var myId = Meteor.userId();
        var userID = _.find(chatRoom.players, function(player){return player.id!=myId}).id
        var user = Meteor.users.findOne(userID);
        if (user == undefined) {return "offline"}
        if(user.status.online){
            return "online";
        }else{
            return "offline";
        }
    },
    emojis: function(){
        return Emojis.find().fetch().slice(0,20*6);
    }
});

Tracker.autorun(function () {
    var chatRoomId = Session.get("ChatRoom.id");
    var chatRoom =  ChatRooms.findOne(chatRoomId);
    scrollDown();
});

function scrollDown(){
    var n = $("#chat-ul").height();
    $('#chatroom-body').animate({ scrollTop: n }, 50);
}