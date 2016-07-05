Template.profileViews.events({
    'click .profile-view-container': function(event){
        var comp = $(event.target);
        var route = "";
        if(comp.attr('data-view') === undefined){
            route = comp.closest(".profile-view-container").attr('data-view');
        }else {
            route = comp.attr('data-view');
        }
        Router.go(route);
    }
});