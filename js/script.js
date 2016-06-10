var url = "https://dl.dropbox.com/s/in9z84yv8kb28lb/references.bib?dl=1";

var rankingByAuthor = [];
var rankingByApplication = [];
var rankingByAlgorithm = [];
var rankingByUniversity = [];
var rankingByLanguage = [];
var rankingByYear = [];

var rankingByApplicationYear = [];
var rankingByApplicationUniversity = [];
var rankingByUniversityYear = [];
var rankingByAlgorithmUniversity = [];
var rankingByAlgorithmYear = [];

var collaborationNetwork = {};
var collaborationNetworkSize = {};

function appendRow(tableId, columns){
	var row = "<tr>";

	$.each(columns, function(key, column){
        if(key == 0){
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

function viewData(title, field, ranking){
    return function(){
        // Remove all rows before adding new rows
        $("#table-view-data tbody").empty();

        $("#modal-view-data-title").html(title)
        $("#modal-view-data-field").html(field);

        var id = 1;

        $.each(ranking, function(index, value){
            appendRow("#table-view-data", [(id++), value.label.replace("###"," "), value.count]);
        });

        $('#modal-view-data').modal('show');
    };
}

function loadBibtextFileFromUrl(){
    showSpin()

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

    var entries = parse(response);

    messageSpin("Ploting charts...");

	plotUsingColumns("#chart-year", entries, rankingByYear, "Year", true);
	plotUsingColumns("#chart-university", entries, rankingByUniversity, "University", false);

    plotUsingHorizontalColumns("#chart-author", entries, rankingByAuthor, "Author");

	plotUsingPie("#chart-application", entries, rankingByApplication, "Application");
	plotUsingPie("#chart-algorithm", entries, rankingByAlgorithm, "Algorithm");
	plotUsingPie("#chart-language", entries, rankingByLanguage, "Language");

    plotTwoCategories("#chart-application-year", entries, rankingByApplicationYear, true, "Application", "Year", "#d95978");
    plotTwoCategories("#chart-application-university", entries, rankingByApplicationUniversity, true, "Application", "University");
    plotTwoCategories("#chart-university-year", entries, rankingByUniversityYear, false, "University", "Year");
	plotTwoCategories("#chart-algorithm-year", entries, rankingByAlgorithmYear, false, "Algorithm", "Year");
	plotTwoCategories("#chart-algorithm-university", entries, rankingByAlgorithmUniversity, false, "Algorithm", "University", "#787cda");

	plotCollaborationNetwork(collaborationNetwork, collaborationNetworkSize);

    hideSpin();

	$(".credits").removeClass("hide");

	$("#collaboration-network").removeClass("hide");

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

    generateRankingForTwoCategories(entry, rankingByApplicationYear, "year", "custom_application");
    generateRankingForTwoCategories(entry, rankingByApplicationUniversity, "custom_ies", "custom_application");
    generateRankingForTwoCategories(entry, rankingByUniversityYear, "year", "custom_ies");
	generateRankingForTwoCategories(entry, rankingByAlgorithmYear, "year", "custom_algorithm");
	generateRankingForTwoCategories(entry, rankingByAlgorithmUniversity, "custom_ies", "custom_algorithm");

    generateCollaborativeGraph(entry);
}

function trimAllFields(entry){
    for(c in entry){
        if( ! Array.isArray(entry[c])){
            entry[c] = entry[c].trim();
        }
    }
}

function generateRankingByAuthors(entry){
    $.each(entry.author, function (index, value) {
		Arrays.insertOrUpdateLabel(rankingByAuthor, value.last.trim());
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

function generateRankingForTwoCategories(entry, ranking, propOne, propTwo){
    if( ! entry[propOne] || ! entry[propTwo]){
		return;
	}

    var arraysOne = Arrays.splitAndTrim(entry[propOne], " and ");
    var arraysTwo = Arrays.splitAndTrim(entry[propTwo], " and ");

    arraysOne = Arrays.unique(arraysOne);
    arraysTwo = Arrays.unique(arraysTwo);

    $.each(arraysOne, function (index, arrayOne) {
        $.each(arraysTwo, function (index, arrayTwo) {
            Arrays.insertOrUpdateLabel(ranking, arrayOne + "###" + arrayTwo);
        });
    });
}

function generateCollaborativeGraph(entry){

	var universities = Arrays.splitAndTrim(entry.custom_ies, " and ");

    universities = Arrays.unique(universities);

	$.each(universities, function (index, author1) {

		if(collaborationNetwork[author1.trim()] == undefined || collaborationNetwork[author1.trim()] == ""){
			collaborationNetwork[author1.trim()] = {children: [], map: 0};
		}

		$.each(universities, function (index, author2) {
			if(author1 != author2){
				collaborationNetwork[author1.trim()].children.push(author2.trim());

				if( ! collaborationNetworkSize[author1.trim()+"_"+author2.trim()]){
					collaborationNetworkSize[author1.trim()+"_"+author2.trim()] = 0;
				}

				collaborationNetworkSize[author1.trim()+"_"+author2.trim()]++;
			}
		});
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

	plotHorizontalColumnChart(options);
}

function plotUsingPie(elementId, entries, ranking, categoryTitle){

	var title = "Number of Publications by " + categoryTitle;

	messageSpin("Ploting " + title + "...");

    var data = [];

    var sumOthers = 0;

	Arrays.sortRankingByCount(ranking);

    $.each(ranking, function(key, entry){
        data.push({name: entry.label, y: entry.count});
    });

    var options = {
		elementId: elementId,
		data: data,
		title: title,
		viewData: viewData(title, categoryTitle, ranking),
	};

    plotPieChart(options);
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
		categories.push(entry.label)
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

	plotColumnChar(options);
}

function plotTwoCategories(elementId, entries, ranking, isApplicationCategory, titleOne, titleTwo, color){

	color = color || "#f6a25c";

	var categoryTitle = titleOne + " and " + titleTwo;

	var title = "Number of Publications by " + categoryTitle;

	messageSpin("Ploting " + title + "...");

    isApplicationCategory = isApplicationCategory || false;

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

    if(isApplicationCategory){
        var applications = getApplicationTypes();
        for(var index in applications){
            if(categoryTwo.indexOf(index) === -1){
                categoryTwo.push(index);
            }
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

	plotBubbleChart(options)
}

function plotBubbleChart(options){
	$(options.elementId).highcharts({
        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy',
			height: options.height || 500,
        },
        legend: {
            enabled: false
        },
        title: {
            text: options.title
        },
        subtitle: {
			text: options.subtitle || 'An Estimate'
		},
        xAxis: {
            min: -1,
            gridLineWidth: 1,
			tickInterval: 1,
			labels: {
                rotation: -45,
                formatter: function() {
                    return options.categoryOne[this.value];
				},
            }
        },
		yAxis: {
            min: -1,
			tickInterval: 1,
			title: {
				text: ""
			},
			labels: {
                formatter: function() {
                    return options.categoryTwo[this.value];
				}
            },

        },
        tooltip: {
			formatter: function(){
				return "<b>"+options.categoryTwo[this.point.y]+" and "+options.categoryOne[this.point.x] + "</b><br> Number of Papers: "+this.point.z;
			}
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.z}'
                }
            }
        },
		exporting: {
            buttons: {
                customButton: {
                    x: -40,
                    onclick: options.viewData,
                    text: "View data"
                }
            }
        },
		credits: {
            enabled: false
        },
        series: options.series
    });
}

function plotHorizontalColumnChart(options){

	$(options.elementId).highcharts({
        chart: {
            type: 'bar',
            height: options.height || 500,
        },
        title: {
            text: options.title
        },
		subtitle: {
			text: options.subtitle || 'An Estimate'
		},
        xAxis: {
            categories: options.categories,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: options.yAxisTitle || 'Number of Papers',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        legend: {
            enabled: options.enabledLegend || false,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
		exporting: {
            buttons: {
                customButton: {
                    x: -40,
                    onclick: options.viewData,
                    text: "View data"
                }
            }
        },
        credits: {
            enabled: false
        },
        series: options.series
    });
}

function plotColumnChar(options){
    $(options.elementId).highcharts({
         chart: {
             type: 'column',
             height: options.height || 500,
         },
         title: {
             text: options.title
         },
         subtitle: {
 			text: options.subtitle || 'An Estimate'
 		 },
         xAxis: {
             categories: options.categories,
         },
         yAxis: {
             min: 0,
             title: {
                 text: options.yAxisTitle || 'Number of Papers',
             },
             stackLabels: {
                 enabled: true,
                 style: {
                     fontWeight: 'bold',
                     color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                 }
             }
         },
         legend: {
             enabled: options.legendEnabled || false,
             align: 'right',
             x: -30,
             verticalAlign: 'top',
             y: 30,
             floating: true,
             backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
             borderColor: '#CCC',
             borderWidth: 1,
             shadow: false
         },
         tooltip: {
             pointFormat: 'Number of Papers: {point.stackTotal}',
         },
         plotOptions: {
             column: {
                 stacking: 'normal',
                 dataLabels: {
                     enabled: true,
                     color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                     style: {
                         textShadow: '0 0 3px black'
                     },
                     formatter: function() {
                         if (this.y !== 0) {
                             return this.y;
                         } else {
                             return null;
                         }
                    }
                 }
             }
         },
         exporting: {
             buttons: {
                 customButton: {
                     x: -40,
                     onclick: options.viewData,
                     text: "View data"
                 }
             }
         },
         credits: {
             enabled: false
         },
         series: options.series
     });
}

function plotPieChart(options){
    $(options.elementId).highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: options.height || 500,
        },
        title: {
            text: options.title
        },
        subtitle: {
           text: options.subtitle || 'An Estimate'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        credits: {
            enabled: false
        },
		exporting: {
            buttons: {
                customButton: {
                    x: -40,
                    onclick: options.viewData,
                    text: "View data"
                }
            }
        },
        series: [{
            name: 'Number of Papers',
            colorByPoint: true,
            data: options.data
        }]
    });
}

$(function(){
	loadBibtextFileFromUrl();
});
