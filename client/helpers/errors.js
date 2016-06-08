defaultTime = 2000;

//Muestra un error con el mensaje pasado por parametro. No realiza traducción
throwError = function(message, time) {
    time = time || defaultTime;
    $('.toast').remove();
    Materialize.toast('<b>' + message + '</b>', time, "toast-error");
}

//Muestra un error traducido a través de la key pasada por argumento.
throwErrorTranslated = function(i18nKey, time){
    time = time || defaultTime;
    throwError(TAPi18n.__(i18nKey), time);
}