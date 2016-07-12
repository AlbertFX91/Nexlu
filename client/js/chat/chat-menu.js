Template.chat_menu.onRendered(function(){
    $("#chat-list-body").niceScroll();
    Meteor.subscribe("user.each.online");
});

Template.chat_menu.events({
    "click #chat-list-close-button": function(){
        $("#chat-list-container").removeClass("fadeInUp").addClass("fadeOutDown");
    }
});

Template.chat_menu.helpers({
    "users": function(){
        return Meteor.users.find({_id: {$ne: Meteor.userId()}});
    }
});