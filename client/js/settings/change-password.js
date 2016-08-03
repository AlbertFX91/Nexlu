Template.change_password.events({
    'submit .password_form': function (event) {
        event.preventDefault();
        var password_current = document.getElementById('password_current').value;
        var password_changed = document.getElementById('password_changed').value;
        var confirmpassword_changed = document.getElementById('confirmpassword_changed').value;
        Accounts.changePassword(password_current, password_changed, function(err){
            if(err){
                Materialize.toast('<b>' + TAPi18n.__("change_password.error_password_change_success") + '</b>', 2700);
            }else{
                Router.go('/');
                Materialize.toast('<b>' + TAPi18n.__("change_password.password_change_success") + '</b>', 2700);
            }
        });
    }
});

$.validator.addMethod("coincidencePasswordChanged", function() {
    var passwordchanged = document.getElementById('password_changed').value;
    var confirmpasswordchanged = document.getElementById('confirmpassword_changed').value;
    var coindicende = true;
    if(passwordchanged != confirmpasswordchanged){
        coindicende = false;
    }
    return coindicende;
});

Template.change_password.onRendered(function(){
    $('#change_password').addClass("active");
    $('#show').mousedown(function(){
        $('#password_changed').removeAttr('type');
    });
    $('#show').mouseup(function(){
        $('#password_changed').attr('type', 'password');
    });
    $( "#password_form" ).validate({
        rules: {
            password_current: {
                required: true
            },
            password_changed: {
                required: true,
                minlength: 8,
                maxlength: 20
            },
            confirmpassword_changed: {
                required: true,
                minlength: 8,
                maxlength: 20,
                coincidencePasswordChanged: true
            }
        },
        messages: {
            password_current: {
                required: TAPi18n.__("error.password_error_empty")
            },
            password_changed: {
                required: TAPi18n.__("error.password_error_empty"),
                minlength: TAPi18n.__("error.password_error_minlength"),
                maxlength: TAPi18n.__("error.password_error_maxlength"),
                pattern: TAPi18n.__("error.password_error_pattern")
            },
            confirmpassword_changed: {
                required: TAPi18n.__("error.confirmpassword_error_empty"),
                minlength: TAPi18n.__("error.password_error_minlength"),
                maxlength: TAPi18n.__("error.password_error_maxlength"),
                pattern: TAPi18n.__("error.password_error_pattern"),
                coincidencePasswordChanged: TAPi18n.__("error.password_error_coincidence")
            }
        }
    });
});