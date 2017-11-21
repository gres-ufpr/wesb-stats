define([
    'jquery',
    'unique',
    'split',
    'sortBy',
    'find',
    'insertUpdate',
    'modalView',
    'plotPie',
], function($, unique, split, sortBy, find, insertUpdate, modalViewData) {

    (function( $ ) {

        $.fn.publicationsByApplication = function(entries) {

            return this.each (function() {

                var array = [];

                $.each(entries, function(key, entry){

                    var applications = unique(split(entry.custom_application, " and "));

                    $.each(applications, function(key, application){
                        array = insertUpdate(array, application);
                    });
                });

                array = sortBy("value", array);

                var total = [];

                $.each(array, function(idRanking, item){
                    total.push({name: item.key, y: item.value})
                });

                $(this).plotPie({
                    title: "Number of Publications by Application",
                    exportingOnclick: function(){
                        modalViewData("Number of Publications by Application", "Application", array);
                    },
                    series: [{
                        colorByPoint: true,
                        data: total
                    }]
                });

                return $(this);
            });
        };

    }( jQuery ));
});
