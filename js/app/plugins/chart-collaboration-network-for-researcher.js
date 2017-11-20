define([
    'jquery',
    'sortBy',
    'find',
    'returnJust',
    'insertUpdate',
    'unique',
    'split',
    'd3jsv4',
    'forceDirectedGraph',
], function($, sortBy, find, returnJust, insertUpdate, unique, split) {

    (function( $ ) {

        $.fn.researcherCollaborationNetwork = function(entries) {

            return this.each (function() {

                var universitiesIds = {};

                var universityCounter = 0;

                $.each(entries, function(key, entry){

                    var universities = unique(split(entry.custom_ies, " and "));

                    $.each(universities, function (index, university) {
                        if( ! universitiesIds[university]){
                            universitiesIds[university] = universityCounter++;;
                        }
                    });
                });

                var nodes = [];

                var array = [];

                $.each(entries, function(key, entry){

                    var universities = split(entry.custom_ies, " and ");

                	if(entry.author.length != universities.length){
                        console.error("The number of authors and universities is different");
                	}

                	$.each(entry.author, function (i, author) {

                        var universityName = universities[i];
                		var universityId = universitiesIds[universityName];

                		var item = find(nodes, "name", author.last);

                		if( ! item){
                			nodes.push({name: author.last, group: universityId},)
                		}
                    });

                    $.each(entry.author, function (i, authorOne) {
                		$.each(entry.author, function (j, authorTwo) {

                            if(authorOne.last == authorTwo.last){
                                return;
                            }

                            var label = authorOne.last + "@" + authorTwo.last;

                            var item = find(array, "key", label);

                            if( ! item){
                                array.push({key:label, value: 1});
                            }else{
                                item.value++;
                            }
                        });
                	});
                });

                var links = [];

                $.each(array, function (i, element) {

                    var elements = split(element.key, "@");

                    var source = find(nodes, "name", elements[0]);
                    var target = find(nodes, "name", elements[1]);

                    if(source&& target){
                        // links.push({"source": nodes.indexOf(source), "target": nodes.indexOf(target), "value": element.value})
                        links.push({"source": source, "target": target, "value": element.value})
                    }
                });

                $(this).append("<p class='title'>Researcher-driven Collaboration Network</p>");
                $(this).append("<center><div id='charts' style='height:500px'></div></center>")

                $(this).find("#charts").forceDirectedGraph(nodes, links);

                return $(this);
            });
        };

    }( jQuery ));
});
