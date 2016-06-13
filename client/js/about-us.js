Template.AboutUs.events({
	"mouseenter .social-icon": function (e){
		$(e.target).removeClass("out").addClass("in");
	},
	"mouseleave .social-icon": function (e){
		$(e.target).removeClass("in").addClass("out");
	},
	'click .aboutUs-mailContact-icon': function(event){
		var mailContact = $(event.target);
		var mail = mailContact.parent().parent().next();
		if (mail.css("display") == "none"){
            mail.slideDown("fast");
		}else if(mail.css("display") !== "none"){
            mail.slideUp("fast");
		}
	},
	'click .aboutUs-mailContact-text': function(event){
		var mailContact = $(event.target);
		var mail = mailContact.parent().parent().next();
		if (mail.css("display") == "none"){
            mail.slideDown("fast");
		}else if(mail.css("display") !== "none"){
            mail.slideUp("fast");
		}
	}
});

Template.AboutUs.onRendered(function(){
    $('.aboutUs-mail').css('display', 'none');
});