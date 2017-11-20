define([
    'jquery',
    'sortBy',
    'find',
    'returnJust',
    'insertUpdate',
    'plotVerticalColumns',
], function($, sortBy, find, returnJust, insertUpdate) {

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
                        $.modalViewData(title, "Year", ranking);
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
