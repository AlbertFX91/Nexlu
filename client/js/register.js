Template.register.events({
    'submit #register_form': function (event) {
        event.preventDefault();
        var username = document.getElementById('username').value;
        var password_register = document.getElementById('password_register').value;
        var confirmpassword = document.getElementById('confirmpassword').value;
        var email = document.getElementById('email').value;
        var isUnique = validate_username(username, email);
        if (username != "" && password_register != "" && password_register == confirmpassword && isUnique == true) {
            var user = [username, password_register, email];
            Accounts.createUser({
                username: user[0],
                password: user[1],
                email: user[2],
                friends: []
            });
            Router.go('thanks_register');
        } else {
            Session.set('alert', "Please, complete username, email and password.");
        }
    }
});

Template.register.onRendered(function(){

});

Template.register.helpers({
    'hasErrors': function(){
        return Session.get("alert") != null;
    },
    'alert': function(){
        return Session.get("alert");
    }
});

function validate_username(usernameRegister, emailRegister){
    var result = false;
    var usernameBD = Meteor.users.findOne({username:usernameRegister});
    var emailDB = Meteor.users.findOne({email: emailRegister});
    if((typeof usernameBD) === 'undefined' && (typeof emailDB) == 'undefined'){
        result = true;
    }
    return result;
}