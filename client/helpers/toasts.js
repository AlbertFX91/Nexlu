defaultTime = 2000;
toast = function(message, time, classname){
    time = time || defaultTime
    classname = classname || ""
    Materialize.toast(message, time, classname);
}

toastTrans = function(i18Key, time, classname){
    time = time || defaultTime
    classname = classname || ""
    toast(TAPi18n.__(i18Key), time, classname);
}
