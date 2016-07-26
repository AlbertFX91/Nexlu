Template.comment.helpers({
    username: function(){
        return ReactiveMethod.call('getUsernameById', this.player, function(err, response){
            if(err){
                console.log(err);
            }
        });
    },
    iLike: function() {
        return _.contains(this.playersLike, Meteor.userId().trim());
    },
    iDislike: function() {
        return _.contains(this.playersDislike, Meteor.userId().trim());
    },
    isMine: function() {
        if (this.player.trim() === Meteor.userId().trim())
            return true;
        return false;
    },
    settingsTextareaEditComment: function () {
        return {
            position: top,
            limit: 5,
            rules: [
                {
                    token: '@',
                    collection: Meteor.users,
                    field: 'username',
                    options: '',
                    template: Template.userPill,
                    noMatchTemplate: Template.notMatch
                }
            ]
        }
    }
});

Template.comment.events({
    'click #edit-comment': function () {
        $('#edit-comment-modal').openModal({complete:function(){
            document.getElementById('edit-comment-error').innerHTML = "";
        }})
        var textarea = document.getElementById('editComment');
        textarea.value = this.description;
        $("#editComment").trigger('autoresize');
        $("#edit-comment-label").addClass("active");
    },
    'click #remove-comment': function () {
        $('#remove-comment-modal').openModal();
    }
    ,
    'submit .edit-comment': function(e) {
        e.preventDefault();
        var description = document.getElementById('editComment').value;
        var commentId = this.id;
        var valido = true;
        if (description.trim() == ""){
            var texto = TAPi18n.__("error.comment-notBlank");
            document.getElementById('edit-comment-error').innerHTML = texto;
            $("#edit-comment-label").removeClass("active");
            valido = false;
        } else if (description.length > 2000) {
            var texto = TAPi18n.__("error.comment-maxlength");
            document.getElementById('edit-comment-error').innerHTML = texto;
            $("#edit-comment-label").hide();
            valido = false;
        }
        /**if (valido) {
            Meteor.call('editComment', commentId, description, function(err, response){
                if (!err){
                    $('#edit-comment-modal').closeModal();
                }
            });
        }**/
    },
    'click #editComment': function(e) {
        e.preventDefault();
        document.getElementById('edit-comment-error').innerHTML = "";
        $("#edit-comment-label").show();
    },
    'submit .remove-comment': function(e) {
        e.preventDefault();
        var commentId = this.id;
        /**Meteor.call('removeComment', commentId, function(err, response){
            if (!err){
                $('#remove-comment-modal').closeModal();
                $('.lean-overlay').remove();
            }
        });**/
    },
    'click #like': function (e) {
        e.preventDefault();
        var commentId = this.id;
        Meteor.call('likeComment', commentId, function(err, response){
            if(err){
                console.log(err);
            }
        });
    },
    'click #dislike': function (e) {
        e.preventDefault();
        var commentId = this.id;
        Meteor.call('dislikeComment', commentId, function(err, response){
            if(err){
                console.log(err);
            }
        });
    },
    'click #i-like': function (e) {
        e.preventDefault();
        var commentId = this.id;
        if (_.contains(this.playersLike, Meteor.userId())){
            Meteor.call('removeLikeComment', commentId, function(err, response){
                if(err){
                    console.log(err);
                }
            });
        }
    },
    'click #i-dislike': function (e) {
        e.preventDefault();
        var commentId = this.id;
        if (_.contains(this.playersDislike, Meteor.userId())){
            Meteor.call('removeDislikeComment', commentId, function(err, response){
                if(err){
                    console.log(err);
                }
            });
        }
    }
});