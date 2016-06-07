Meteor.methods({
    sendEmail: function(){
       MailService.send("test_message","test-template",{},"alberto.rojas.fndez@gmail.com");
    }
});