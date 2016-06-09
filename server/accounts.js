Accounts.config({sendVerificationEmail: true, forbidClientAccountCreation: false, loginExpirationInDays: 10});
Accounts.emailTemplates.siteName = "Nexlu";
Accounts.emailTemplates.from = "Nexlu <hello@nexlu.com>";
Accounts.emailTemplates.verifyEmail.subject = function (user) {
    var currentLang = ServerSession.get("currentLang");
    return TAPi18n.__("email.verification-email_subject", null, currentLang);
};
Accounts.emailTemplates.verifyEmail.html = function (user, url) {
    var url = url.replace('#/', '');
    var currentLang = ServerSession.get("currentLang");
    Template.registerHelper('_', TAPi18n.__.bind(TAPi18n));
    TAPi18next.setLng(currentLang);
    SSR.compileTemplate('verification-email', Assets.getText('verification-email.html'));
    return SSR.render("verification-email", {user: user, url: url, lang: currentLang});
};