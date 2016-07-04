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
    "image.new": function(data){
        var user = Meteor.user();
        if(user!=undefined){
            var image = {
                owner: [
                    {
                        id: user._id,
                        username: user.username
                    }
                ],
                createdAt: new Date(),
                playersTagged: [], //TODO: Añadir etiquetas
                description: data.description,
                playersLike: [],
                playersDislike: [],
                comments: [],
                url: data.url
            };
            return Images.insert(image);
        }else{
            throw Meteor.Error("User not logued");
        }
    }
});