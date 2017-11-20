define([
    'jquery',
    'sortBy',
    'find',
    'split',
    'insertUpdate',
    'plotWordCloud',
], function($, sortBy, find, split, insertUpdate) {

    (function( $ ) {

        $.fn.wordCloudAbstract = function(entries) {

            return this.each (function() {

                var text = " ";

                $.each(entries, function(key, entry){

                    if(entry.abstract){
                        text += entry.abstract + " ";
                    }
                });

                $(this).plotWordCloud({
                    title: "Word Cloud of Abstract",
                    text: text
                });

                return $(this);
            });
        };

    }( jQuery ));
});
