Template.notification.events({
    'click .notification-row': function(e){
        if(!this.watched){
            Meteor.call("notification.watched", this.id);
        }
    },
    'click .notification-watched-btn': function(e){
        e.preventDefault();
        if(!this.watched){
            Meteor.call("notification.watched", this.id);
        }
    },
    'click .notification-trash-btn': function(e){
        e.preventDefault();
        Meteor.call("notification.remove", this.id);
    },
    'click .notification-all-watched-btn': function(e){
        e.preventDefault();
        Meteor.call("notification.watched.all");
    },
    'click .notification-all-trash-btn': function(e){
        e.preventDefault();
        Meteor.call("notification.remove.all");
    }
});

Template.notification.helpers({
    isNew: function(){
       return this.watched? "": "new-notification";
    },
    notificationsSorted: function(){
        return _.sortBy(Meteor.user().notifications, function(n){return n.createdAt}).reverse();
    }
});