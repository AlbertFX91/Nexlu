Meteor.methods({
    sendExampleEmail: function(){
       MailService.send("email.test_message","test-template",{},"alberto.rojas.fndez@gmail.com");
    },
    'checkPassword': function(digest) {
        check(digest, String);

        if (this.userId) {
            var user = Meteor.user();
            var password = {digest: digest, algorithm: 'sha-256'};
            var result = Accounts._checkPassword(user, password);
            return result.error == null;
        } else {
            return false;
        }
    },
    'codificaString': function (noCodificado) {
        var encodedString = Base64.encode(noCodificado);
        return encodedString;
    },
    'deCodificaString': function (codificado) {
        var decodedString = Base64.decode(codificado);
        return decodedString;
    },
    'getUsernameById': function(id){
        var user = Meteor.users.findOne(id, {fields:{username:1}});
        return user.username;
    },
    'editPublication': function(publicationId, description){
        Publications.update(publicationId, {
            $set: {
                description: description
            }
        })
    },
    'removePublication': function(publicationId){
        Publications.remove(publicationId);
    }
});