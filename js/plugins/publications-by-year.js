(function( $ ) {

    $.fn.publicationsByYear = function(options) {

      console.log("Publications by year")

    return this.each (function() {
      $(this).html("oi");
    });


    };


    function plotUsingColumns(elementId, entries, ranking, categoryTitle, countSorted){

    	var title = "Number of Publications by " + categoryTitle;

    	messageSpin("Ploting " + title + "...");

    	if(countSorted){
    		Arrays.sortRankingByLabel(ranking);
    	}else{
    		Arrays.sortRankingByCount(ranking);
    	}

        var categories = [];

    	var data = [];

    	$.each(ranking, function(key, entry){
    		categories.push(entry.label);
    		data.push(entry.count);
        });

    	var series = [{name:"Number of Papers", data:data, color: "#7cb5ec"}];

        var options = {
    		elementId: elementId,
    		categories: categories,
    		series: series,
    		title: title,
            subtitle: " ",
            legendEnabled: false,
    		viewData: viewData(title, categoryTitle, ranking),
    	};

    	Highcharts.plotColumnChar(options);
    }

}( jQuery ));
