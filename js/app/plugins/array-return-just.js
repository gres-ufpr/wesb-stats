define([], function() {

    return function(property, array) {

        if(property) property = property.trim();

        var keys = [];

        for(var i = 0; i < array.length; i++){

            var element = array[i];

            if( ! element.hasOwnProperty(property)){
                throw "Property '" + property + "' was not found in the element";
            }

            keys.push(element[property]);
        }

        return keys;
    };
});
