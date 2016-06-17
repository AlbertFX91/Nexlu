Prettify = {
    compactInteger: function(number, decimals){
        decimals = decimals || 3;
        if(Math.abs(number)<1000){
            return ""+number;
        }else{
            return Humanize.compactInteger(number, decimals);
        }
    }
}