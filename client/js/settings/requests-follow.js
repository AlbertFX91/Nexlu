Template.requests_follow.helpers({
    userFrom: function(){
        return ReactiveMethod.call("userRequestFrom", this.from);
    }
});

Template.requests_follow.onRendered(function(){
    $('#requests_follow').addClass("active");
});