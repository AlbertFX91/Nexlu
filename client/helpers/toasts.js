defaultTime = 2000;
Toasts = {
    throw:  function(message, time, classname){
        time = time || defaultTime
        classname = classname || ""
        Materialize.toast(message, time, classname);
    },
    throwTrans: function(i18Key, time, classname){
        time = time || defaultTime
        classname = classname || ""
        Toasts.throw(TAPi18n.__(i18Key), time, classname);
    }
};



