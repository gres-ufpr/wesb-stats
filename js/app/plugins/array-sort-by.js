define([], function() {

    return function(prop, array, mode) {

        mode = mode || "asc";
        prop = prop || "value";

        return array.sort(function(a, b){

            if(typeof a[prop] === "number" && typeof b[prop] === "number"){
                if(mode === "asc")
                    return b[prop] - a[prop];
                return a[prop] - b[prop];
            }

            if(mode === "asc")
                return a[prop].localeCompare(b[prop]);
            return b[prop].localeCompare(a[prop]);
        });
    };
});
