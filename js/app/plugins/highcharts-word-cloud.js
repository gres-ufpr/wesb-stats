define([
    'jquery',
    'highcharts',
    'highchartsExporting',
    'highchartsWordCloud',
], function($) {

    (function( $ ) {

        function replaceAll(target, search, replacement) {
            return target.replace(new RegExp(search, 'g'), replacement);
        };

        $.fn.plotWordCloud = function(options) {

            var defaults = {
                title: "Title",
                height: 500,
                exportingOnclick: null,
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
                " na ", " no ",
                " on ", " the ", " in ", " of ", " for ", " and ",
                ":"
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
                            onclick: settings.exportingOnclick,
                            text: "View data"
                        }
                    }
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