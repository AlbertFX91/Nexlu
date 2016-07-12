Template.chat_menu.onRendered(function(){
    $("#chat-list-body").niceScroll();
});

Template.chat_menu.events({
    "click #chat-list-close-button": function(){
        $("#chat-list-container").removeClass("fadeInUp").addClass("fadeOutDown");
    }
});