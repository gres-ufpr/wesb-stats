define([
    'jquery',
    'parse',
    'spinJs',
    'highchartsBoost',
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
], function($, parse, spinJS) {

    var url = "https://raw.githubusercontent.com/thiagodnf/wesb-stats/master/references.bib";

    $(function(){

        function showSpin(){
        	$(".panel-loading").removeClass("hide");
        }

        function hideSpin(){
        	$(".panel-loading").addClass("hide");
        }

        showSpin();

        $.ajax({
    		url: url,
    		dataType: "text",
    		success:  function(response){

                $("#panel-loading-text").text("Parsing...");

    			var entries = $.parse(response);

                $("#panel-loading-text").text("Ploting...");

                $("#content").removeClass("hide");

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

                hideSpin();
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
