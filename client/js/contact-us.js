Template.ContactUs.events({
	'submit #contact_us_form': function(event){
		event.preventDefault();
		var user = $("#user").val();
		var email = $("#email").val();
		var message = $("#message").val();
		var info = [user, email, message];
		Meteor.call("send_message_about", info);
		Materialize.toast(TAPi18n.__("email.email-sent"), 3000);
		Router.go('/');
	}
});

Meteor.startup(function(){
	Tracker.autorun(function(){
		$.validator.addMethod("emailPattern", function(value, element){
			return /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/.test(value);
		}, TAPi18n.__("error.email_error_patron"));
	})
});

Template.ContactUs.onRendered(function(){
	$( "#contact_us_form" ).validate({
		rules: {
			user: {
				required: true,
				minlength: 2,
				maxlength: 15
			},
			email: {
				required: true,
				emailPattern: true
			},
			message: {
				required: true,
				minlength: 20,
				maxlength: 300
			}
		},
		messages: {
			user: {
				required: TAPi18n.__("error.username_error_empty"),
				minlength: TAPi18n.__("error.username_error_minlength"),
				maxlength: TAPi18n.__("error.username_error_maxlength")
			},
			email: {
				required: TAPi18n.__("error.email_error_empty")
			},
			message: {
				required: TAPi18n.__("error.message_error_empty"),
				minlength: TAPi18n.__("error.message_error_minlength"),
				maxlength: TAPi18n.__("error.message_error_maxlength")
			}
		}
	});
});