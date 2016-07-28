Template.foo.onRendered(function(){
    Meteor.subscribe("search.users");
});

Template.foo.helpers({
    settings: function() {
        console.log(Meteor.users);
        return {
            position: "down",
            limit: 5,
            rules: [
                {
                    collection: Meteor.users,
                    field: "username",
                    template: Template.userPillSearch,
                    noMatchTemplate: Template.notMatch
                }
            ]
        };
    }
});