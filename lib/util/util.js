Util = {

    validate_password: function (password_register, confirmpassword){
        var result = true;
        if(password_register != confirmpassword){
            result = false;
        }
        re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if(!re.test(password_register)){
            result = false;
        }
        if(confirmpassword == ""){
            result = false;
        }
        if(password_register == ""){
            result = false;
        }
        return result;
    },

    validate_email: function (emailRegister){
        var result = true;
        var emailDB = Meteor.users.findOne({'emails.address': emailRegister});
        if(!((typeof emailDB) == 'undefined')){
            result = false;
        }
        if(emailRegister == ""){
            result = false;
        }
        return result;
    },

    validate_username: function(usernameRegister){
        var result = true;
        var usernameBD = Meteor.users.findOne({username:usernameRegister});
        if(!((typeof usernameBD) == 'undefined')){
            result = false;
        }
        if(usernameRegister == ""){
            result = false;
        }
        return result;
    },
    validateTag: function(description) {
        var re = /@(\w+)/gm;
        var match;
        var results = [];
        do {
            match = re.exec(description);
            if (match)
                results.push(match[1].trim());
        } while (match);

        var resultsUnique = _.uniq(results);
        var resultsValidated = _.filter(resultsUnique, function (username) {
            return Meteor.users.find({'username': username}).fetch().length == 1
        });

        return resultsValidated;
    },

    //SOURCE: http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata y adaptado a Meteor
    dataURItoFile: function(img) {
        var dataURI = img.resultEdited;
        if(dataURI == undefined) dataURI = img.result;
        var type = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        return new File([new Uint8Array(array)], img.name, {type: type});
    }
};