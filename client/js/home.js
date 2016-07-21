Template.home.events({
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
		}
});