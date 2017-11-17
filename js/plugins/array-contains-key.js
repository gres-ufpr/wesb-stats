(function( $ ) {

    $.containsKey = function(array, key) {

        for(var i = 0; i < array.length; i++){
            if(array[i].hasOwnProperty(key)){
                return array[i];
            }
        }

        return;
    };
}( jQuery ));
