var url = "https://dl.dropbox.com/s/in9z84yv8kb28lb/references.bib?dl=1";

var entries = {};

var rankingByAuthor = [];
var rankingByApplication = [];
var rankingByAlgorithm = [];
var rankingByUniversity = [];
var rankingByLanguage = [];
var rankingByYear = [];
var rankingByCollaboration = [];

var collaborationNetwork = {};
var collaborationNetworkSize = {};

var rankingbyTheMostNumberOfCollaboration = [];
var rankingbyTheMostNumberOfAuthors = [];

var tableListOfPublications = {};

var drilldowns = [
	{entry: "Algorithm",  categories: {
		"ACO" : "Swarm Intelligence",
		"MOPSO" : "Swarm Intelligence",
		"PSO" : "Swarm Intelligence",
		"NSGA-II" : "Evolutionary Algorithms",
		"IBEA" : "Evolutionary Algorithms",
		"PAES" : "Evolutionary Algorithms",
		"SPEA2" : "Evolutionary Algorithms",
		"MoCell" : "Evolutionary Algorithms",
		"Random Search" : "Random Search",
		"Local Search Strategy" : "Local Search",
		"Simulated Annealing" : "Local Search",
		"Iterated Local Search" : "Local Search",
		"Hill Climbing" : "Local Search",
		"Multistart Strategy-based SA" : "Local Search",
		"Brute-force Search" : "Brute-force and Exact Methods",
		"Branch-and-Bound" : "Brute-force and Exact Methods",
		"Greedy Algorithm" : "Greedy Algorithm",
		"Genetic Algorithms" : "Evolutionary Algorithms",
		"Coevolutionary Genetic Algorithm with Controled Genetic Classification" : "Evolutionary Algorithms",
		"Coevolutionary Genetic Algorithm" : "Evolutionary Algorithms",
		"Parallel Genetic Algorithms" : "Evolutionary Algorithms",
		"GA-MI" : "Evolutionary Algorithms",
		"A1" : "Evolutionary Algorithms",
		"Clustering Algorithm" : "Clustering Algorithm",
		"K-medoids" : "Clustering Algorithm",
		"Hierarchical Clustering Algorithm" : "Clustering Algorithm",
		"K-means" : "Clustering Algorithm",
	}},
];

var dimensionsForBubbleChart = [
	{name:"Application", bibtexEntry:"custom_application", ignoredWords:[]},
	{name:"Year", bibtexEntry:"year", ignoredWords:[]},
	{name:"Algorithm", bibtexEntry:"custom_algorithm", ignoredWords:[]},
	{name:"Algorithm 2", bibtexEntry:"custom_algorithm_2", ignoredWords:[]},
	{name:"University", bibtexEntry:"custom_ies", ignoredWords:[]},
	{name:"Study Type", bibtexEntry:"custom_study_type", ignoredWords:[]},
	{name:"Instance Type",bibtexEntry:"custom_instance_type", ignoredWords:['No Used']},
];

function appendRow(tableId, columns){
	var row = "<tr>";

	$.each(columns, function(key, column){
        if(key === 0){
            row += "<td width='50px'>CONTENT</td>".replace("CONTENT", column);
        }else{
            row += "<td>CONTENT</td>".replace("CONTENT", column);
        }
	});

	row += "</tr>";

	$(tableId+" > tbody").append(row);
}

function showSpin(){
	$(".panel-loading").removeClass("hide");
}

function hideSpin(){
	$(".panel-loading").addClass("hide");
}

function messageSpin(text){
	$("#panel-loading-text").text(text);

	console.log(text);
}

function loadBubbleChart(propX, propY, color){

	var ranking = [];

	// Find the ignored words

	var ignoredWordsForXAxis = [];
	var ignoredWordsForYAxis = [];

	for(var i = 0 ; i < dimensionsForBubbleChart.length; i++){
		if(dimensionsForBubbleChart[i].bibtexEntry == propX){
			ignoredWordsForXAxis = dimensionsForBubbleChart[i].ignoredWords;
		}
		if(dimensionsForBubbleChart[i].bibtexEntry == propY){
			ignoredWordsForYAxis = dimensionsForBubbleChart[i].ignoredWords;
		}
	}

	$.each(entries, function(key, entry){
        generateRankingForTwoCategories(entry, ranking, propX, propY, ignoredWordsForXAxis, ignoredWordsForYAxis);
    });

	var firstLabel = "";
	var secondLabel = "";

	$.each(dimensionsForBubbleChart, function(index, obj){
		if(obj.bibtexEntry == propX){
			firstLabel = obj.name;
		}
		if(obj.bibtexEntry == propY){
			secondLabel = obj.name;
		}
	});

	plotTwoCategories("#chart-two-dimensions", entries, ranking, firstLabel, secondLabel, color);
}

function viewData(title, field, ranking){
    return function(){
        // Remove all rows before adding new rows
        $("#table-view-data tbody").empty();

        $("#modal-view-data-title").html(title);
        $("#modal-view-data-field").html(field);

        var id = 1;

        $.each(ranking, function(index, value){
            appendRow("#table-view-data", [(id++), value.label.replace("###"," "), value.count]);
        });

        $('#modal-view-data').modal('show');
    };
}

function loadBibtextFileFromUrl(){
    showSpin();

	messageSpin("Sending request...");

    $.ajax({
        url: url,
        dataType: "text",
        success: success,
        error: function( event, request, exception){
            //If exception null, then default to xhr.statusText
            var errorMessage = exception || event.statusText;

            $("#error").html(errorMessage);

            hideSpin();
        }
    });
}

function success(response){
	messageSpin("Received");

    entries = parse(response);

    messageSpin("Ploting charts...");

	$("#charts").removeClass("hide");

	plotUsingColumns("#chart-year", entries, rankingByYear, "Year", true);
	plotUsingColumns("#chart-university", entries, rankingByUniversity, "University", false);

    plotUsingHorizontalColumns("#chart-author", entries, rankingByAuthor, "Author");

	plotUsingPie("#chart-application", entries, rankingByApplication, "Application");
	plotUsingPie("#chart-algorithm", entries, rankingByAlgorithm, "Algorithm");
	plotUsingPie("#chart-language", entries, rankingByLanguage, "Language");

    plotCollaborationNetwork(collaborationNetwork, collaborationNetworkSize);

	loadBubbleChart("year", "custom_application", "#7cb5ec");

	plotTheMostNumberOf("#most-number-collaboration", rankingbyTheMostNumberOfCollaboration, 2);
	plotTheMostNumberOf("#most-number-author", rankingbyTheMostNumberOfAuthors, 2)

    hideSpin();

	// Repaint the table
	tableListOfPublications.draw( false );

	messageSpin("Done");
}

function getApplicationTypes(){
    // Based on SWEBok
    return {
        "Software Requirements": "1",
        "Software Design": "2",
        "Software Construction": "3",
        "Software Testing": "4",
        "Software Maintenance": "5",
        "Software Configuration Management": "6",
        "Software Engineering Management": "7",
        "Software Engineering Process": "8",
        "Software Engineering Models and Methods": "9",
        "Software Quality": "10",
        "Introductory/Survey": "11",
    };
}

function parse(content){
    messageSpin("Parsing...");

    // Creating the bibtex object for parse the bibtext file
    var bibtex = new BibTex();

    // Getting the div's content for parse it
    bibtex.content = content;

    // Parse the bibtext file
    bibtex.parse();

    messageSpin("Processing the entries...");

     // Array with all entries
    var entries = [];

    // Save all converted entries
    for (var index = 0; index < bibtex.data.length; index++) {
        entries.push(bibtex.data[index]);
    }

    $.each(entries, function(key, entry){
        processEntry(entry);
    });

    return entries;
}

function processEntry(entry){
    trimAllFields(entry);

    generateRankingByAuthors(entry);

    generateRankingBy(entry, rankingByYear, "year");
    generateRankingBy(entry, rankingByApplication, "custom_application");
    generateRankingBy(entry, rankingByAlgorithm, "custom_algorithm");
    generateRankingBy(entry, rankingByUniversity, "custom_ies");
	generateRankingBy(entry, rankingByLanguage, "custom_language");

    generateCollaborativeGraph(entry);

	// Append new row
	tableListOfPublications.row.add( [
		entry.year.trim(),          // YEAR COLUMN
		new Publications().convertEntryToReference(entry).trim(),    // PUBLICATION COLUMN
	]);
}

function trimAllFields(entry){
    for(var c in entry){
        if( ! Array.isArray(entry[c])){
            entry[c] = entry[c].trim();
        }
    }
}

function generateRankingByAuthors(entry){
    $.each(entry.author, function (index, value) {
		Arrays.insertOrUpdateLabel(rankingByAuthor, value.last.trim());
		Arrays.insertOrUpdateLabel(rankingbyTheMostNumberOfAuthors, entry.year + " " + entry.title);
	});
}

function generateRankingBy(entry, ranking, property){
    if( ! entry[property]){
		return;
	}

    var array = Arrays.splitAndTrim(entry[property], " and ");

    array = Arrays.unique(array);

    $.each(array, function (index, value) {
        Arrays.insertOrUpdateLabel(ranking, value);
    });
}

function generateRankingForTwoCategories(entry, ranking, propX, propY, ignoredWordsForXAxis, ignoredWordsForYAxis){
	var pX = propX;
	var pY = propY;

	if(propX == "custom_algorithm_2"){
		pX = "custom_algorithm";
	}
	if(propY == "custom_algorithm_2"){
		pY = "custom_algorithm";
	}

	if( ! entry[pX] || ! entry[pY]){
		return;
	}

	var arraysForX = Arrays.splitAndTrim(entry[pX], " and ");
    var arraysForY = Arrays.splitAndTrim(entry[pY], " and ");

    if(propX == "custom_algorithm_2"){
		for(var i = 0 ; i < arraysForX.length; i++){
			arraysForX[i] = drilldowns[0].categories[arraysForX[i]] || "Other";
		};
	}
	if(propY == "custom_algorithm_2"){
		for(var i = 0 ; i < arraysForY.length; i++){
			arraysForY[i] = drilldowns[0].categories[arraysForY[i]] || "Other";
		};
	}

	arraysForX = Arrays.unique(arraysForX);
	arraysForY = Arrays.unique(arraysForY);

    $.each(arraysForX, function (index, wordX) {
		if(ignoredWordsForXAxis.indexOf(wordX) != -1){
			return;
		}
		$.each(arraysForY, function (index, wordY) {
			if(ignoredWordsForYAxis.indexOf(wordY) != -1){
				return;
			}
			Arrays.insertOrUpdateLabel(ranking, wordX + "###" + wordY);
        });
    });
}

function generateCollaborativeGraph(entry){

	var universities = Arrays.splitAndTrim(entry.custom_ies, " and ");

    universities = Arrays.unique(universities);

	var map = {};

	$.each(universities, function (index, author1) {

		if( ! collaborationNetwork[author1.trim()]){
			collaborationNetwork[author1.trim()] = {children: [], map: 0};
		}

		$.each(universities, function (index, author2) {
			if(author1 != author2){
				collaborationNetwork[author1.trim()].children.push(author2.trim());

				if( ! collaborationNetworkSize[author1.trim()+"_"+author2.trim()]){
					collaborationNetworkSize[author1.trim()+"_"+author2.trim()] = 0;
				}

				collaborationNetworkSize[author1.trim()+"_"+author2.trim()]++;

				Arrays.insertOrUpdateLabel(rankingByCollaboration, author1.trim()+"###"+author2.trim());
			}
		});

		Arrays.insertOrUpdateLabel(rankingbyTheMostNumberOfCollaboration, entry.year + " " + entry.title);
	});

	for(var prop in collaborationNetwork){
		collaborationNetwork[prop].children = Arrays.unique(collaborationNetwork[prop].children);
	}
}

function plotUsingHorizontalColumns(elementId, entries, ranking, categoryTitle){

	var title = "Number of Publications by " + categoryTitle;

	messageSpin("Ploting " + title + "...");

	Arrays.sortRankingByCount(ranking);

    var categories = [];

    var data = [];

	$.each(ranking, function(key, entry){
	    if(data.length != 15){
	        categories.push(entry.label);
	        data.push(entry.count);
		}
	});

    var series = [{name: "Number of Papers", data: data, color:"#90ed7d"}];

    var options = {
		elementId: elementId,
		categories: categories,
		series: series,
		title: title,
        subtitle: " ",
		viewData: viewData(title, categoryTitle, ranking),
	};

	Highcharts.plotHorizontalColumnChart(options);
}

function plotUsingPie(elementId, entries, ranking, categoryTitle){

	var title = "Number of Publications by " + categoryTitle;

	messageSpin("Ploting " + title + "...");

    var data = [];

	var sumOthers = 0;

	Arrays.sortRankingByCount(ranking);

	var drilldownsCategories;

	$.each(drilldowns, function(key, entry){
		if(entry.entry == categoryTitle){
			drilldownsCategories = entry.categories;
		}
	});

	var group = {};

	$.each(ranking, function(key, entry){
		if(!drilldownsCategories){
			data.push({name: entry.label, y: entry.count});
		}else{

			var category = drilldownsCategories[entry.label];

			if( ! category){
				category = "Other";
			}

			if( ! group[category]){
				group[category] = [];
			}

			group[category].push(entry);
		}
    });

	var dd = {
		series: [],
	};

	for(var i in group){
		var total = 0;

		var values = [];

		$.each(group[i], function(key, entry){
			total += entry.count;
			values.push([entry.label,entry.count]);
		});

		data.push({name: i, y: total, drilldown: i});
		dd.series.push({name: i, data: values, id: i});
	}

	var subtitle;

	if(categoryTitle == "Algorithm"){
		subtitle = "Click the slices to view the algorithms";
	}

    var options = {
		elementId: elementId,
		data: data,
		subtitle: subtitle,
		seriesName: categoryTitle,
		drilldown: dd,
		title: title,
		viewData: viewData(title, categoryTitle, ranking),
	};

    Highcharts.plotPieChart(options);
}

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

function plotTwoCategories(elementId, entries, ranking, titleOne, titleTwo, color){

	color = color || "#f6a25c";

	var categoryTitle = titleOne + " and " + titleTwo;

	var title = "Number of Publications by " + categoryTitle;

	messageSpin("Ploting " + title + "...");

	Arrays.sortRankingByCount(ranking);

    var categoryOne = [];
    var categoryTwo = [];

	$.each(ranking, function(key, entry){
        var split = entry.label.split("###");

        var cOne = split[0];
        var cTwo = split[1];

        if(categoryOne.indexOf(cOne) === -1)
            categoryOne.push(cOne);

        if(categoryTwo.indexOf(cTwo) === -1)
            categoryTwo.push(cTwo);
	});

	var applications = getApplicationTypes();

	for(var index in applications){
		if(titleOne == "Application" && categoryOne.indexOf(index) == -1){
			categoryOne.push(index);
		}
		if(titleTwo == "Application" && categoryTwo.indexOf(index) == -1){
			categoryTwo.push(index);
		}
	}

    categoryOne = categoryOne.sort();
    categoryTwo = categoryTwo.sort();

    var data = [];

    $.each(ranking, function(key, entry){
		var split = entry.label.split("###");

        data.push({
            x: parseInt(categoryOne.indexOf(split[0])),
            y: parseInt(categoryTwo.indexOf(split[1])),
            z: entry.count,
        });
	});

	var series = [{ color: color, data: data}];

	var options = {
		elementId: elementId,
		series: series,
		title: title,
		categoryOne: categoryOne,
		categoryTwo: categoryTwo,
		categoryTitle: categoryTitle,
        subtitle: " ",
        legendEnabled: false,
		viewData: viewData(title, categoryTitle, ranking),
	};

	Highcharts.plotBubbleChart(options);
}

function plotTheMostNumberOf(id, ranking, size){

	Arrays.sortRankingByCount(ranking);

	for(var i = 0; i < size; i++){
		$(id).append("<li>"+ranking[i].label+ " ("+ranking[i].count+")"+"</li>")
	}
}

$(function(){

	$.each(dimensionsForBubbleChart, function(index, obj){
		$('#bubble-chart-x-axis').append($('<option>', {value: obj.bibtexEntry, text : obj.name}));
		$('#bubble-chart-y-axis').append($('<option>', {value: obj.bibtexEntry, text : obj.name}));
	});

	$('#bubble-chart-x-axis [value=year]').attr('selected', 'selected');
	$('#bubble-chart-y-axis [value=custom_application]').attr('selected', 'selected');

	$("select").change(function(event){
		var xAxis = $('#bubble-chart-x-axis').val();
		var YAxis = $('#bubble-chart-y-axis').val();
		var color = $('#bubble-chart-color').val();

		loadBubbleChart(xAxis, YAxis, color);
	});

	$("#btn-cn-view-data").click(function(){
		Arrays.sortRankingByCount(rankingByCollaboration);

		return viewData("Collaboration Network", "University", rankingByCollaboration)();
	});

	$(document).on('click', ".export-link", function(event){
		 event.preventDefault();

		$("#export-bibtex").html($(this).attr("data-bibtex-entry"));

		$("#modal-export-bibtex").modal('show');
	});

	tableListOfPublications = $("#table-list-of-publications").DataTable({
		"order": [[ 0, "desc" ]],   // Sort by year. Newer first.
		columnDefs: [
            { width: 20, targets: 0 }
        ],
		 "autoWidth": false,
		"lengthMenu": [[5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, "All"]],
		"iDisplayLength": 5
	});

	loadBibtextFileFromUrl();
});
