MailService = {
    send: function (subjectKey, template, params, to){
        var currentLang = ServerSession.get("currentLang");
        TAPi18next.setLng(currentLang)
        SSR.compileTemplate(template, Assets.getText(template+".html"));
        Template.registerHelper('_', TAPi18n.__.bind(TAPi18n));
        var subject = TAPi18n.__(subjectKey, null, currentLang);
        params.lang = currentLang;
        //En esta linea presenta un warning en la consola del servidor. Dice que el lenguaje no es soportado pero sin embargo si que lo traduce
        var html = SSR.render(template, params);
        Email.send({
            from: "Nexlu <hello@nexlu.com>",
            subject: subject,
            html: html,
            to: to
        });
    }
}
