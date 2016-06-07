Meteor.startup(function () {
    /*Si existe un cambio en algun dato dentro de la función, se ejecutará.
    Por lo tanto, si se cambia la variable de lenguaje, añadimos el lenguaje al servidor y al cliente
    */
    Tracker.autorun(function () {
        if (Meteor.status().connected) {
            TAPi18n.setLanguage(getUserLanguage());
        }
    });
});

getUserLanguage = function () {
    var currentLang = Session.get("currentLang");
    var lang = "en";
    if (currentLang) {
        lang = currentLang;
    }
    Session.setPersistent("currentLang", lang);
    /*Añadimos tambien la variable en el servidor, de esta forma, reconoceremos el lenguaje que está usando cada cliente
      Esto lo usaremos para enviar correos en distintos idiomas */
    ServerSession.set("currentLang", lang);
    return lang;
};