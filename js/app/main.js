define([
    'jquery',
    'parse',
    'publicationsByYear',
    'publicationsByAuthor',
    'publicationsByUniversity',
    'publicationsByApplication',
    'publicationsByAlgorithm',
    'dynamicPieChart',
    'dynamicBubbleChart',
    'universityCollaborationNetwork',
    'researchCollaborationNetwork',
    'listOfPublications',
    'wordCloudTitle',
    'wordCloudAbstract',
], function($, parse) {

    var url = "https://raw.githubusercontent.com/thiagodnf/wesb-stats/master/references.bib";

    $(function(){

        $.ajax({
    		url: url,
    		dataType: "text",
    		success:  function(response){

    			var entries = $.parse(response);

    			$("#publications-by-year").publicationsByYear(entries);
                $("#publications-by-author").publicationsByAuthor(entries);
                $("#publications-by-university").publicationsByUniversity(entries);
                $("#publications-by-application").publicationsByApplication(entries);
                $("#publications-by-algorithm").publicationsByAlgorithm(entries);
                $("#dynamic-pie-chart").dynamicPieChart(entries);
                $("#dynamic-bubble-chart").dynamicBubbleChart(entries);
                $("#university-collaboration-network").universityCollaborationNetwork(entries);
                $("#researcher-collaboration-network").researcherCollaborationNetwork(entries);
                $("#list-of-publications").listOfPublications(entries);
                $("#word-cloud-title").wordCloudTitle(entries);
                $("#word-cloud-abstract").wordCloudAbstract(entries);
    		},
    		error: function( event, request, exception){
    			//If exception null, then default to xhr.statusText
    			var errorMessage = exception || event.statusText;

    			$("#error").html(errorMessage);

    			hideSpin();
    		}
    	});
    });
});
