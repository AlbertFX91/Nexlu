Meteor.methods({
    sendExampleEmail: function(){
       MailService.send("email.test_message","test-template",{},"alberto.rojas.fndez@gmail.com");
    }
});