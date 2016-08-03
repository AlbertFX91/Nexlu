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
    }
});