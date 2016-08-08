Template.Settings.onRendered(function(){
    $(document).ready(function(){
        $('ul.tabs').tabs();
    });
    $('#general').addClass("active");
    $( "#email_form" ).validate({
        rules: {
            email: {
                required: true,
                emailUnique: true
            }
        },
        messages: {
            email: {
                required: TAPi18n.__("error.email_error_empty"),
                emailUnique: TAPi18n.__("error.email_error_duplicated")
            }
        }
    });
});

Template.Settings.events({
    'submit .email_form': function (event) {
        event.preventDefault();
        var email = document.getElementById('email').value;
        Meteor.call("update.email.user", email);
        Router.go('/');
        Materialize.toast('<b>' + TAPi18n.__("general.email_change_success") + '</b>', 2700);
    }
});

Template.Settings.helpers({
    email_user: function(){
        return Meteor.user().emails[0].address;
    }
});