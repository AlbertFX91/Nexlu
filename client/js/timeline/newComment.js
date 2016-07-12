Template.newComment.events({
    'submit form': function(e) {
        e.preventDefault();
        var description = $("textarea#newComment").val();
        var userId = Meteor.userId();
        var publicationId = this._id;
        var valido = true;
        if (description.trim() == ""){
            var texto = TAPi18n.__("error.post-notBlank");
            document.getElementById('comment-error').innerHTML = texto;
            valido = false;
        } else if (description.length > 2000) {
            var texto = TAPi18n.__("error.post-maxlength");
            document.getElementById('comment-error').innerHTML = texto;
            valido = false;
        }
        var comment = {
            createdAt: new Date(),
            description: description,
            player: userId,
            playersLike: [],
            playersDislike: []
        };
        if (valido) {
            Meteor.call('postComment', publicationId, comment, function(err, response) {
                if (!err){
                    var textarea = $("textarea#newComment").val("");
                    $("#newPublication").trigger('autoresize');
                }
            });
        }
    },
    'click #newComment': function(e) {
        e.preventDefault();
        $(e.target).parent().parent().next().children('#comment-error').text("");
    }
});