Template.menu.events({
	'click #showLoginModal': function(){
        Session.set('showLoginModal', true);
    },
    'click #logout': function(event){
  		$('#user-menu').trigger('mouseleave');
  			Meteor.logout(function(err) {
                if (!err) {
                    Router.go("/");
                    Materialize.toast('<b>' + TAPi18n.__("logout_success") + '</b>', 2700);
                }
            });
    },
    'mouseenter .boton-logo-nav':function(){
        $('#text-logo-ne').css('color', 'white');
        $('#text-logo-lu').css('color', 'white');
    },
    'mouseleave .boton-logo-nav':function(){
        $('#text-logo-lu').css('color', 'transparent');
        $('#text-logo-ne').css('color', 'transparent');
    },
    'click .search_modal': function(e){
        e.preventDefault();
        $('.modal_search').openModal();
    }
});
Template.menuLogged.helpers({
    hasRequests: function(){
        return Meteor.user().requestsFollow.length > 0;
    },
    numRequests: function(){
        return Meteor.user().requestsFollow.length;
    },
    hasNotifications: function(){
        var length = _.filter(Meteor.user().notifications, function(n){return !n.watched}).length;
        return length > 0;
    },
    numNotifications: function(){
        var length = _.filter(Meteor.user().notifications, function(n){return !n.watched}).length;
        return length > 50? "+50":length
    },
    heightcss: function(){
        var currentLocale = TAPi18n.getLanguage();
        if(currentLocale == "en"){
            return "218px";
        }else{
            return "200px";
        }
    }
});

Template.menuLogged.events({
    'click .search_modal': function(e){
        e.preventDefault();
        $('.modal_search').openModal();
    },
    'click #badge-button': function(e){
        e.preventDefault();
        if($("#notif-container").css("display") == "none"){
            $("#div1").css("display", "block");
            $("#notif-container").css("display", "block");
        }else{
            $("#div1").css("display", "none");
            $("#notif-container").css("display", "none");
        }
    },
    'submit .remove-all-notif': function(e) {
        e.preventDefault();
        Meteor.call("notification.remove.all");
        $('#remove-all-notif-modal').closeModal()
    }
});