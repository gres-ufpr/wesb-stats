(function( $ ) {

    $.increase = function(array, key) {

        $.each(array, function(id, item){
            if(item.hasOwnProperty(key)){
                return true;
            }
        });

        return false;
    };
}( jQuery ));
