//Muestra un error con el mensaje pasado por parametro. No realiza traducción
throwError = function(message) {
    $('.toast').remove();
    Materialize.toast('<b>' + message + '</b>', 2000, "toast-error");
}

//Muestra un error traducido a través de la key pasada por argumento
throwErrorTranslated = function(i18nKey){
    throwError(TAPi18n.__(i18nKey));
}