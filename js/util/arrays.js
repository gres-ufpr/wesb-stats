function Arrays () {}


Arrays.containsLabel = function (array, label) {
    if( ! array){
        throw "Array cannot be undefined";
    }

    for(var i = 0; i < array.length; i++){
		if(array[i].label.trim() == label.trim()){
			return i;
		}
	}

	return -1;
};

Arrays.insertOrUpdateLabel = function(array, label){
    var index = Arrays.containsLabel(array, label);

	if(index != -1){
		array[index].count++;
	}else{
		array.push({"label": label, "count": 1});
	}
};
