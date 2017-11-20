define([], function() {

    return function(array) {

        if( ! array){
            return undefined;
        }

        var result = [];

        for (var i = 0; i < array.length; i++){
            if (result.indexOf(array[i]) === -1 && array[i] !== ''){
                result.push(array[i]);
            }
        }

        return result;
    };
});
