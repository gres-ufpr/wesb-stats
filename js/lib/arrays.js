function Arrays () {}

Arrays.splitAndTrim = function (array, key) {
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

Arrays.unique = function (array) {
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

Arrays.sortRankingByCount = function(array){
	array.sort(function(a, b){
        var diff = parseInt(a.count) - parseInt(b.count);

        if(diff == 0){
            return 0;
        }else if(diff > 0){
            return -1;
        }else if(diff < 0){
            return 1;
        }
    });
};

Arrays.sortRankingByLabel = function(array){
	array.sort(function(a, b){
        return a.label.localeCompare(b.label);
    });
};

Arrays.insertOrUpdateLabel = function(array, label){
    var index = Arrays.containsLabel(array, label);

	if(index != -1){
		array[index].count++;
	}else{
		array.push({"label": label, "count": 1});
	}
};
