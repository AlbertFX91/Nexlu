Meteor.subscribe('allUsers');

Template.register.events({
    'click .continue': function(event){
        event.preventDefault();
        var username = document.getElementById('username').value;
        var password_register = document.getElementById('password_register').value;
        var confirmpassword = document.getElementById('confirmpassword').value;
        var email = document.getElementById('email').value;
        var email_no_errors = Util.validate_email(email);
        var username_no_errors = Util.validate_username(username);
        var password_no_errors = Util.validate_password(password_register, confirmpassword);
        Session.set("validate", false);
        if (username_no_errors == true  && email_no_errors == true && password_no_errors == true) {
            Session.set("validate", true);
            var user = [username, password_register, email];
            Session.set("user", user);
            $('#data_register').css('display', 'none');
            $('#data_register').css('visibility', 'hidden');
            $('.div_form_more').css('display', 'block');
            $('.div_form_more').css('visibility', 'visible');
        }
    },
    'click .finish': function (event) {
        event.preventDefault();
        var description = document.getElementById('textarea1').value;
        if (Session.get("validate")){
            var user = Session.get("user");
            user[3] = description;
            Accounts.createUser({
                username: user[0],
                password: user[1],
                email: user[2],
                image: null,
                description: user[3],
                friends: []
            });
            Router.go('thanks_register');
        }else {
            Session.set('alert', "wrongs");
        }
    },
    disabled: function(){
        return "disabled";
    }
});

Template.register.onRendered(function(){
});

Template.register.helpers({

});