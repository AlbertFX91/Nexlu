Template.publication.helpers({
    tagged_pretty: function(){
        return Prettify.compactTags(this.playersTagged);
    },
    isMine: function() {
        if (Meteor.user() && this.owner.id.trim() === Meteor.userId().trim())
            return true;
        return false;
    },
    descriptionTruncated: function() {
        var description = this.description;
        return Humanize.truncate(description, 200);
    },
    descriptionTruncate: function() {
      return this.description.length >= 200;
    },
    iLike: function() {
        return _.contains(this.playersLike, Meteor.userId().trim());
    },
    iDislike: function() {
        return _.contains(this.playersDislike, Meteor.userId().trim());
    },
    settingsTextareaEdit: function () {
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
    },
    hasComments: function() {
      return this.comments.length > 0;
    },
    
    // TODO: Esto hay que hacerlo en el lado del server (methods):
    listLikes: function(likes){
        var likes_username = _.map(likes, function(id){
            var user = Meteor.users.findOne(id, {fields:{username:1}});
            return user.username;
        });
        return likes_username; // lista con los usernames de los usuarios que le dieron like.
    },
    listDislikes: function(dislikes){
        var dislikes_username = _.map(dislikes, function(id){
            var user = Meteor.users.findOne(id, {fields:{username:1}});
            return user.username;
        });
        return dislikes_username; // lista con los usernames de los usuarios que le dieron dislikes.
    },

    tags: function(){
        return this.playersTagged;
    }
});

Template.publication.events({
    'click #edit-pub': function () {
        $('#edit-pub-modal').openModal({complete:function(){
            document.getElementById('edit-post-error').innerHTML = "";
        }});
        var textarea = document.getElementById('editPublication');
        textarea.value = this.description;
        $("#editPublication").trigger('autoresize');
        $("#edit-post-label").addClass("active");
    },
    'click #remove-pub': function () {
        $('#remove-pub-modal').openModal();
    }
    ,
    'submit .edit-post': function(e) {
        e.preventDefault();
        var description = document.getElementById('editPublication').value;
        var descriptionTrim = description.trim();
        var publicationId = this._id;
        var valido = true;
        if (descriptionTrim == ""){
            var texto = TAPi18n.__("error.post-notBlank");
            document.getElementById('edit-post-error').innerHTML = texto;
            $("#edit-post-label").removeClass("active");
            valido = false;
        } else if (descriptionTrim.length > 5000) {
            var texto = TAPi18n.__("error.post-maxlength");
            document.getElementById('edit-post-error').innerHTML = texto;
            $("#edit-post-label").hide();
            valido = false;
        }
        //Comprobación del etiquetado con '@'
        var usernamesTagged = Util.validateTag(descriptionTrim);
        if (valido) {
           Meteor.call('editPublication', publicationId, descriptionTrim, usernamesTagged, function(err, response){
               if (!err){
                   $('#edit-pub-modal').closeModal();
               }
           });
        }
    },
    'click #editPublication': function(e) {
        e.preventDefault();
        document.getElementById('edit-post-error').innerHTML = "";
        $("#edit-post-label").show();
    },
    'submit .remove-post': function(e) {
        e.preventDefault();
        var publicationId = this._id;
        Meteor.call('removePublication', publicationId, function(err, response){
            if (!err){
                $('#remove-pub-modal').closeModal();
                $('.lean-overlay').remove();
            }
        });
    },
    'click #read-more': function(e) {
        e.preventDefault();
        var readLess = "<a id='read-less'> " + TAPi18n.__("timeline.read-less") + "</a>";
        $(e.target).parent().empty().append(this.description, readLess);
    },
    'click #read-less': function(e) {
        e.preventDefault();
        var description = this.description;
        var descriptionTruncated = Humanize.truncate(description, 200);
        var readMore = "<a id='read-more'> " + TAPi18n.__("timeline.read-more") + "</a>";
        $(e.target).parent().empty().append(descriptionTruncated, readMore);
    },
    'click #like': function (e) {
        e.preventDefault();
        var publicationId = this._id;
        if (!_.contains(this.playersLike, Meteor.userId())){
            Meteor.call('likePublication', publicationId, function(err, response){
                if(err){
                    console.log(err);
                }
            });
        }
    },
    'click #dislike': function (e) {
        e.preventDefault();
        var publicationId = this._id;
        if (!_.contains(this.playersDislike, Meteor.userId())){
            Meteor.call('dislikePublication', publicationId, function(err, response){
                if(err){
                    console.log(err);
                }
            });
        }
    },
    'click #i-like': function (e) {
        e.preventDefault();
        var publicationId = this._id;
        if (_.contains(this.playersLike, Meteor.userId())){
            Meteor.call('removeLikePublication', publicationId, function(err, response){
                if(err){
                    console.log(err);
                }
            });
        }
    },
    'click #i-dislike': function (e) {
        e.preventDefault();
        var publicationId = this._id;
        if (_.contains(this.playersDislike, Meteor.userId())){
            Meteor.call('removeDislikePublication', publicationId, function(err, response){
                if(err){
                    console.log(err);
                }
            });
        }
    },
    'click #view-comments': function (e) {
        e.preventDefault();
        $(e.target).next().removeClass('hide');
        $(e.target).parent().next().removeClass('hide');
        $(e.target).addClass('hide');
    },
    'click #hide-comments': function (e) {
        e.preventDefault();
        $(e.target).prev().removeClass('hide');
        $(e.target).parent().next().addClass('hide');
        $(e.target).addClass('hide');
    },
    'click .tags_modal': function(e){
        e.preventDefault();
        $(e.target).next().openModal();
    }
});
