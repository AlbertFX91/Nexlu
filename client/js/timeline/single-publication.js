Template.singlePublication.onRendered(function(){
    //console.log(this);
});

Template.singlePublication.helpers({
    pub: function(){
        console.log(this);
        return this;
    }
});