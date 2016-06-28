Prettify = {
    compactInteger: function(number, decimals){
        decimals = decimals || 3;
        if(Math.abs(number)<1000){
            return ""+number;
        }else{
            return Humanize.compactInteger(number, decimals);
        }
    },

    compactTags: function(tags){
        var tags_username = _.pluck(tags, 'username');
        return Humanize.oxford(tags_username, 2, TAPi18n.__("timeline.more-tags"));
    },
}