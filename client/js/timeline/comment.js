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
        if (Meteor.user() && this.player.trim() === Meteor.userId().trim())
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
    'click #edit-comment': function (e) {
        e.preventDefault();
        $(e.target).parent().parent().next().openModal({complete:function(){
            document.getElementById('edit-comment-error').innerHTML = "";
        }});
        var textarea = $(e.target).parent().parent().next().find('#editComment');
        var label = $(e.target).parent().parent().next().find('#edit-comment-label');
        textarea.text(this.description);
        textarea.trigger('autoresize');
        label.addClass("active");
    },
    'click #remove-comment': function (e) {
        $(e.target).parent().parent().nextAll("#remove-comment-modal").openModal();
    }
    ,
    'submit .edit-comment': function(e) {
        e.preventDefault();
        var description = e.target.editComment.value;
        var descriptionTrim = description.trim();
        var commentId = this.id;
        var valido = true;
        var error = $(e.target).find("#edit-comment-error");
        var label = $(e.target).find('#edit-comment-label');
        if (descriptionTrim == ""){
            var texto = TAPi18n.__("error.comment-notBlank");
            error.text(texto);
            label.removeClass('active');
            valido = false;
        } else if (descriptionTrim.length > 2000) {
            var texto = TAPi18n.__("error.comment-maxlength");
            error.text(texto);
            label.hide();
            valido = false;
        }
        if (valido) {
            Meteor.call('editComment', commentId, descriptionTrim, function(err, response){
                if (!err){
                    $(e.target).parents('#edit-comment-modal').closeModal();
                }
            });
        }
    },
    'click #editComment': function(e) {
        e.preventDefault();
        $(e.target).parents('.edit-comment').find('#edit-comment-error').text("");
        $("#editComment").focus();
        $(e.target).next().show();
    },
    'click #edit-comment-label': function(e) {
        e.preventDefault();
        $(e.target).prev().focus();
    },
    'submit .remove-comment': function(e) {
        e.preventDefault();
        var commentId = this.id;
        Meteor.call('removeComment', commentId, function(err, response){
            if (!err){
                $(e.target).parents('#remove-comment-modal').closeModal();
                $('.lean-overlay').remove();
            }
        });
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