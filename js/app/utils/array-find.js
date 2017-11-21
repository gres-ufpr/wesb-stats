define([], function() {

    return function(array, property, findFor) {

        property = property || "key";

    //    if(findFor) findFor = findFor.trim();
        if(property) property = property.trim();

        for(var i = 0; i < array.length; i++){

            var element = array[i];

            if( ! element.hasOwnProperty(property)){
                throw "Property '" + property + "' was not found in the element";
            }

            var value = element[property];

            //if(value) value = value.trim();

            if(value === findFor){
                return element;
            }
        }

        return undefined;
    };
});
