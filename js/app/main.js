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
    'wordCloudAbstractEnglish',
    'wordCloudAbstractPortuguese',
], function($, parse, spinJS) {

    var url = "https://raw.githubusercontent.com/gres-ufpr/wesb-stats/master/references.bib";

    if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
        url = "http://localhost:8080/wesb-stats/references.bib";
    }

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
                $("#word-cloud-abstract-english").wordCloudAbstractEnglish(entries);
                $("#word-cloud-abstract-portuguese").wordCloudAbstractPortuguese(entries);

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
