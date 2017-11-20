define([
    'jquery',
    'unique',
    'split',
    'find',
    'sortBy',
    'insertUpdate',
    'plotPie',
], function($, unique, split, find, sortBy, insertUpdate) {

    var drilldowns = {
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
		"CPLEX" : "Brute-force and Exact Methods",
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
	};

    function getCategory(algorithm){
        var category = drilldowns[algorithm];

        if( ! category){
            category = "Other";
        }

        return category;
    }

    (function( $ ) {

        $.fn.publicationsByAlgorithm = function(entries) {

            return this.each (function() {

                var categories = [];
                var algorithms = [];

                $.each(entries, function(key, entry){

                    var uAlgorithms = unique(split(entry.custom_algorithm, " and "));

                    $.each(uAlgorithms, function(key, algorithm){
                        categories = insertUpdate(categories, getCategory(algorithm));
                        algorithms = insertUpdate(algorithms, algorithm);
                    });
                });

                categories = sortBy("value", categories, "asc");
                algorithms = sortBy("value", algorithms, "asc");

                var series = [];
                var drilldown = [];

                $.each(categories, function(key, category){
                    series.push({name: category.key, y: category.value, drilldown: category.key});
                    drilldown.push({name: category.key, id: category.key, data: []});
                });

                $.each(algorithms, function(key, algorithm){

                    var element = find(drilldown, "name", getCategory(algorithm.key));

                    if(element){
                        element.data.push([algorithm.key, algorithm.value]);
                    }
                });

                $(this).plotPie({
                    title: "Number of Publications by Algorithm",
                    subtitle: "Click the slices to view the algorithms",
                    exportingOnclick: function(){
                        $.modalViewData(title, "Algorithm", ranking);
                    },
                    series: [{
                        name: "Algorithm",
                        data: series
                    }],
                    drilldown: {
                        series: drilldown
                    }
                });

                return $(this);
            });
        };

    }( jQuery ));
});
