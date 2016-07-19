Template.chat_menu_user_entry.events({
    'click .chat-menu-user-entry': function(){
        var follower_id = this._id;
        var my_id = Meteor.userId();
        Meteor.call("chatroom.exists", my_id, follower_id, function(e, id){
            if (id==undefined){
                Meteor.call("chatroom.new", my_id, follower_id, function(e,id){
                    Session.set("ChatRoom.id", id);
                });
            }else{
                Session.set("ChatRoom.id", id);
            }
            $("#chat-menu-user-"+follower_id).children(".new-message-container").removeClass("new");
        })
    }
});

Template.chat_menu_user_entry.helpers({
    user_status: function(){
        var online = this.status.online;
        return online? "online": "offline";
    }
});