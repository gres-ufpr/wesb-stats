define(['jquery','unique','split'], function($, unique, split) {

    return function(entries) {

        var obj = {};

        var objId = 0;

        $.each(entries, function(i, entry){

            var universities = unique(split(entry.custom_ies, " and "));

            $.each(universities, function(j, university){
                if( ! obj.hasOwnProperty(university)){
                    obj[university] = {id: objId++, publications: 0};
                }
                obj[university].publications++;
            });
        });

        return obj;
    };
});
