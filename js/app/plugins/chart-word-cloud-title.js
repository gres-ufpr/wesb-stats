define([
    'jquery',
    'sortBy',
    'find',
    'split',
    'insertUpdate',
    'plotWordCloud',
], function($, sortBy, find, split, insertUpdate) {

    (function( $ ) {

        $.fn.wordCloudTitle = function(entries) {

            return this.each (function() {

                var text = " ";

                $.each(entries, function(key, entry){
                    text += entry.title+" " ;
                });

                $(this).plotWordCloud({
                    title: "Word Cloud of Title",
                    text: text
                });

                return $(this);
            });
        };

    }( jQuery ));
});
