define([
    'jquery',
    'unique',
    'split',
    'sortBy',
    'find',
    'returnJust',
    'insertUpdate',
    'modalView',
    'plotHorizontalColumns',
], function($, unique, split, sortBy, find, returnJust, insertUpdate, modalViewData) {

    (function( $ ) {

        $.fn.publicationsByUniversity = function(entries) {

            return this.each (function() {

                var array = [];

                $.each(entries, function(idEntry, entry){

                    var universities = unique(split(entry.custom_ies, " and "));

                    $.each(universities, function(idIes, university){
                        array = insertUpdate(array, university);
                    });
                });

                array = sortBy("value", array, "asc");

                $(this).plotVerticalColumns({
                    title: "Number of Publications by University",
                    categories: returnJust("key", array).slice(0, 15),
                    exportingOnclick: function(){
                        modalViewData("Number of Publications by University", "University", array);
                    },
                    series: [{
                        name: 'Number of Papers',
                        color: "#f7a35c",
                        data: returnJust("value", array).slice(0, 15)
                    }]
                });

                return $(this);
            });
        };

    }( jQuery ));
});
