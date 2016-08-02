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
    }
});