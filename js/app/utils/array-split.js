define([], function() {

    return function(array, key) {

        if( ! array){
            return undefined;
        }

        var result = array.split(key);

        for(var i = 0; i < result.length; i++){
            if(result[i]){
                result[i] = result[i].trim();
            }
        }

        return result;
    };
});
