define([
    'jquery',
    'modalView',
    'highcharts',
    'highchartsExporting',
    'highchartsWordCloud',
], function($, modalViewData) {

    (function( $ ) {

        function replaceAll(target, search, replacement) {
            return target.replace(new RegExp(search, 'g'), replacement);
        };

        $.fn.plotWordCloud = function(options) {

            setTimeout(() => {

                var defaults = {
                    title: "Title",
                    height: 500,
                    exportingOnclick: function(){
                        modalViewData("Word Cloud", "Author", array);
                    },
                    text: ""
                }

                var settings = $.extend( {}, defaults, options );

                console.log("Ploting " + settings.title);

                var text = settings.text.toLowerCase();

                var words = split(text, " ");

                var ignoredWords = [
                    ":", "'", "\\\(","\\\)", "/",
                    " de "," para "," em ", " Uma ", " na ", " ao ", " por ",
                    " com ", " uma ", " do ", " da ", " um ",
                    " a ", " e ", " i ", " o ", " u ", " é ",
                    " da ", " de ", " do ",
                    " na ", " no ", " como ", " que ", " as ", " é ", " das ", " dos ",
                    " se ", " os ", " esse ", " essa ", " isso ", " nas ", " nos ", " são ", " tem ",
                    " têm ", " sua ", " seu ", " se ", " foi ", " pode ", " ser ", " ou ", " mais ",
                    " seja ", " sido ", " seus ", " suas ", " este ", " esta ", " isto ",
                    " with ", " or ", " its ", " it ", " which ", " those ", " these ", " has ", " have ",
                    " on ", " the ", " in ", " of ", " for ", " and ", " an ", " by ", " been ", " from ", " more ",
                    " at ", " are ", " is ", " this ", " that ", " about ", " to ", " be ", " we ",
                    " into ", " ever ", " most ", " over ",
                    " thus ", " i ", " e ", " than ", " was ", " were ",
                    " that ", " their ", " them ", " there ", " when ",
                ];

                $.each(ignoredWords, function(key, ignoredWord){
                    text = replaceAll(text, ignoredWord, " ");
                });

                var replacedWords = [
                    ["search based", "search-based"],
                    ["multiobjetivo", "multi-objetivo"],
                    ["multiobjetiva", "multi-objetiva"],
                    ["multi-objetivos", "multi-objetivo"],
                    ["multiobjective", "multi-objective"],
                    ["releases", "release"],
                    ["algoritmos", "algoritmo"],
                    ["testes", "teste"],
                    ["nsgaII", "nsga-II"],
                    ["meta-heurísticas", "nsga-II"],
                    ["baseado", "baseada"],
                    ["casos", "caso"],
                    ["funções", "função"],
                    ["heuristicas", "heuristica"],
                    ["métricas", "métrica"],
                    ["pesquisas", "pesquisa"],
                    ["propostas", "proposta"],
                    ["relevâncias", "relevância"],
                    ["técnicas", "técnica"],
                    ["evaluated", "evaluate"],
                    ["evaluates", "evaluate"],
                    ["projects", "project"],
                    ["works", "work"],
                    ["algorithms", "algorithm"],
                    ["algoritmos", "algoritmo"],
                    ["cases", "case"],
                    ["efforts", "effort"],
                    ["elements", "element"],
                    ["faults", "fault"],
                    ["functions", "function"],
                    ["hyper-heuristics", "hyper-heuristic"],
                    ["meta-heuristics", "meta-heuristic"],
                    ["metaheuristic", "meta-heuristic"],
                    ["metrics", "metric"],
                    ["objectives", "objective"],
                    ["operators", "operator"],
                    ["problems", "problem"],
                    ["products", "product"],
                    ["project’s", "project"],
                    ["requirements", "requirement"],
                    ["researches", "research"],
                    ["solutions", "solution"],
                    ["sources", "source"],
                    ["strategies", "strategy"],
                    ["studies", "study"],
                    ["systems", "system"],
                    ["techniques", "technique"],
                    ["versions", "version"],
                ];

                $.each(replacedWords, function(key, replacedWord){
                    text = replaceAll(text, replacedWord[0], replacedWord[1]);
                });

                var lines = text.split(/[,\. ]+/g),
                    data = Highcharts.reduce(lines, function (arr, word) {
                        var obj = Highcharts.find(arr, function (obj) {
                            return obj.name === word;
                        });
                        if (obj) {
                            obj.weight += 1;
                        } else {
                            obj = {
                                name: word,
                                weight: 1
                            };
                            arr.push(obj);
                        }
                        return arr;
                    }, []);

                var filtered = [];


                $.each(data, function(key, d){
                    if(d.weight > 1){
                        filtered.push(d);
                    }
                });


                $(this).highcharts({
                    chart: {
                        type: 'wordcloud',
                        height: settings.height,
                    },
                    credits: {
                        enabled: false
                    },
                    exporting: {
                        buttons: {
                            customButton: {
                                onclick: function(){

                                    data.sort(function(a, b){
                                        return b.weight - a.weight;
                                    });

                                    modalViewData("Word Cloud", "Author", data);
                                },
                                text: "View data"
                            }
                        }
                    },
                    boost: {
                        useGPUTranslations: true
                    },
                    series: [{
                        data: filtered,
                        name: 'Occurrences'
                    }],
                    title: {
                        text: settings.title
                    }
                });

            }, 2000);
        };

    }( jQuery ));
});
