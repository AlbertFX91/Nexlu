Template.userPillSearch.events({
    'labelClass': function () {
        if(this._id === Meteor.userId()) {
            return "label-warning";
        }else if(this.profile.online === true){
            return "label-success";
        }else{
            return ""
        }
    }
});

Template.userPillSearch.events({
    'click .click-profile': function (event) {
        console.log("entro en click profile");
        event.preventDefault();
        var username = $(this).attr("username");
        Router.go('profile',{username: username});
    }
});