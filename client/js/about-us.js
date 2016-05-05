Template.AboutUs.events({
	"mouseenter .social-icon": function (e){
		$(e.target).removeClass("out").addClass("in");
	},
	"mouseleave .social-icon": function (e){
		$(e.target).removeClass("in").addClass("out");
	}
});