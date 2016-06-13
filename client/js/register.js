Template.register.events({
    'submit #register_form': function (event) {
        event.preventDefault();
        var firstName = document.getElementById('firstName').value;
        var password_register = document.getElementById('password_register').value;
        var confirmpassword = document.getElementById('confirmpassword').value;
        var email = document.getElementById('email').value;
        if (firstName != "" && password_register != "" && password_register == confirmpassword) {
            var passwordvalcod =  Meteor.call('codificaString', password_register);
            var user = [firstName, passwordvalcod, email];
            Meteor.call('save_user', user);
        } else {
            console.log("deben ser =");
            throwErrorTranslated("error.register_wrong");
        }
    }
});

Template.register.onRendered(function(){
    $('#errorTerms').css('display','none');
});

Template.register.helpers({
    'hasErrors': function(){
        return Session.get("alert") != null;
    },
    'alert': function(){
        return Session.get("alert");
    }
});
