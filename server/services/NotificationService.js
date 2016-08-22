NotificationService = {
    create: function(descriptionKey, owner_id, url){
        var user = Meteor.user();
        if(user._id != owner_id){
            Meteor.users.update(owner_id, {
                "$push": {
                    "notifications": {
                        id: new Mongo.ObjectID()._str,
                        createdAt: new Date(),
                        descriptionKey: descriptionKey,
                        username: user.username,
                        watched: false,
                        url: url
                    }
                }
            })
        }
    },
    createLikePub: function(owner_id, pub_id){
        NotificationService.create("notification.notif-like-pub", owner_id, "/publication/"+pub_id)
    },
    createLikeImg: function(owner_id, img_id){
        NotificationService.create("notification.notif-like-img", owner_id, "/img/"+img_id)
    },
    createLikeComment: function(owner_id, pub_id, type){
        NotificationService.create("notification.notif-like-comment", owner_id, "/"+type+"/"+pub_id)
    },
    createTagPub: function(owner_id, pub_id){
        NotificationService.create("notification.notif-tag-pub", owner_id, "/publication/"+pub_id)
    },
    createTagImg: function(owner_id, img_id){
        NotificationService.create("notification.notif-tag-img", owner_id, "/img/"+img_id)
    },
    createFollow: function(owner_id){
        NotificationService.create("notification.notif-follow", owner_id, "/profile/"+Meteor.user().username)
    },
    createWantsFollow: function(owner_id){
        NotificationService.create("notification.notif-wants-follow", owner_id, "/requests")
    },
    createMsgChat: function(owner_id){
        NotificationService.create("notification.notif-msg-chat", owner_id, "")
    },
    createComment: function(owner_id, pub_id, type){
        NotificationService.create("notification.notif-comment", owner_id, "/"+type+"/"+pub_id)
    }
};