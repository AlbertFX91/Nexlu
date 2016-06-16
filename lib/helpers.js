/*Aqui definimos helpers que pueden ser llamados desde cualquier template: ej: {{verifiedUser}} **/
Template.registerHelper("verifiedUser", function () {
    return UserUtils.verifiedUser();
});