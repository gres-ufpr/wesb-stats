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
                " de "," para "," em ", " Uma ", " na ", " ao ", " por ",
                " com ", " uma ", " do ", " da ", " um ",
                " a ", " e ", " i ", " o ", " u ",
                " da ", " de ", " do ",
                " na ", " no ", " como ",
                " on ", " the ", " in ", " of ", " for ", " and ", " an ", " by ",
                " at ", " are ", " is ", " this ", " that ", " about ", " to ",
                ":", "-",
            ];

            $.each(ignoredWords, function(key, ignoredWord){
                text = replaceAll(text, ignoredWord, " ");
            });

            var replacedWords = [
                ["search based", "search-based"],
                ["multiobjetivo", "multi-objetivo"],
                ["multiobjetiva", "multi-objetiva"],
                ["multi-objetivos", "multi-objetivo"],
                ["releases", "release"],
                ["algoritmos", "algoritmo"],
                ["testes", "teste"],
                ["nsgaII", "nsga-II"],
                ["meta-heurísticas", "nsga-II"],
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
                    data: data,
                    name: 'Occurrences'
                }],
                title: {
                    text: settings.title
                }
            });
        };

    }( jQuery ));
});
