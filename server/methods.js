Meteor.methods({
    sendEmail: function(){
        var currentLang = ServerSession.get("currentLang");
        var subject = "";
        var body = "";

        if(currentLang == "en"){
            subject = "Hello player!";
            body = "Nice to see you!";
        }

        if(currentLang == "es"){
            subject = "Hola jugador!";
            body = "Me alegro de verte por aqui";
        }


        Email.send({
            from: "Nexlu <welcome@nexlu.com>",
            subject: subject,
            body: body,
            to: "alberto.rojas.fndez@gmail.com"

        });
    }
});