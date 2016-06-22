Template.ContactUs.events({
	'submit #contact_us_form': function(event){
        event.preventDefault();
        var user = $("#user").val();
        var email = $("#email").val();
        var message = $("#message").val();
        var info = [user, email, message];
		Meteor.call("send_message_about", info);
        Router.go('/');
	}
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
				required: true
			},
			message: {
				required: true,
				minlength: 10,
				maxlength: 180
			}
		},
		messages: {
            user: {
				required: TAPi18n.__("error.username_error_empty"),
				minlength: TAPi18n.__("error.username_minlength"),
				maxlength: TAPi18n.__("error.username_maxlength")
			},
			email: {
				required: TAPi18n.__("error.email_error_empty")
			},
			message: {
				required: TAPi18n.__("error.message_error_empty"),
				minlength: TAPi18n.__("error.message_minlength"),
				maxlength: TAPi18n.__("error.message_maxlength")
			}
		}
	});
});