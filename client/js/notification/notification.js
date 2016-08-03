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
    }
});

Template.notification.helpers({
    isNew: function(){
       return this.watched? "": "new-notification";
   }
});