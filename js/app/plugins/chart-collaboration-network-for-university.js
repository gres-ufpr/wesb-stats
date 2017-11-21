define([
    'jquery',
    'sortBy',
    'find',
    'returnJust',
    'insertUpdate',
    'unique',
    'split',
    'd3js',
    'hierarchicalEdgeBundling',
], function($, sortBy, find, returnJust, insertUpdate, unique, split) {

    (function( $ ) {

        $.fn.universityCollaborationNetwork = function(entries) {

            return this.each (function() {

                var array = [];

                $.each(entries, function(key, entry){

                    var universities = unique(split(entry.custom_ies, " and "));

                    for(var i = 0; i < universities.length; i++){
                        for(var j = 0; j < universities.length; j++){
                            if(universities[i] != universities[j]){
                                array = insertUpdate(array, universities[i]+"###"+universities[j]);
                            }
                        }
                    }
                });

                var total = [];

                $.each(array, function(key, element){

                    var universities = split(element.key, "###");

                    var item = find(total, "name", universities[0]);

                    if(item){
                        item.imports.push(universities[1]);
                    }else{
                        total.push({
                            "name": universities[0],
                            "size": 1,
                            "imports": [universities[1]]
                        });
                    }
                });

                $(this).append("<p class='title'>Collaboration Network</p>");
                $(this).append("<center><div id='chart' style='height:500px'></div></center>")

                $(this).find("#chart").hierarchicalEdgeBundling({
                    data: total,
                    sizes: array
                });

                return $(this);
            });
        };

    }( jQuery ));
});
