Template.chat_menu.onRendered(function(){
    Session.set("ChatRoom.id", null);
    $("#chat-list-body").niceScroll();
    Meteor.subscribe("user.each.chat");
    var handle = Meteor.users.find({_id: {$ne: Meteor.userId()}}).observeChanges({
        changed: function(id, fields){
            console.log("CHANGED ["+id+"]: "+fields);
        }
    })
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