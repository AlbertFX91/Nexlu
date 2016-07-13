Template.chat_chatroom.onRendered(function(){
    $("#chatroom-body").niceScroll();
    Meteor.subscribe("chatroom.mine");
    Session.set("user.status","offline");
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
    }
});