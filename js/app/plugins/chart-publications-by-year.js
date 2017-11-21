define([
    'jquery',
    'sortBy',
    'find',
    'returnJust',
    'insertUpdate',
    'modalView',
    'plotVerticalColumns',
], function($, sortBy, find, returnJust, insertUpdate, modalViewData) {

    (function( $ ) {

        $.fn.publicationsByYear = function(entries) {

            return this.each (function() {

                var array = [];

                $.each(entries, function(key, entry){
                    array = insertUpdate(array, entry.year);
                });

                array = sortBy("key", array);

                $(this).plotVerticalColumns({
                    title: "Number of Publications by Year",
                    categories: returnJust("key", array),
                    exportingOnclick: function(){
                        modalViewData("Number of Publications by Year", "Year", array);
                    },
                    series: [{
                        name: 'Number of Papers',
                        data: returnJust("value", array)
                    }]
                });

                return $(this);
            });
        };

    }( jQuery ));
});
