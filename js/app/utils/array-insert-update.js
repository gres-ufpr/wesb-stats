define(['find'], function(find) {

    return function(array, value) {

        var element = find(array, "key", value);

        if(element){
            element.value++;
        }else{
            array.push({key: value, value: 1});
        }

        return array;
    };
});
