define([
    'jquery',
    'sortBy',
    'find',
    'split',
    'insertUpdate',
    'plotWordCloud',
], function($, sortBy, find, split, insertUpdate) {

    (function( $ ) {

        $.fn.wordCloudAbstractEnglish = function(entries) {

            return this.each (function() {

                var text = " ";

                $.each(entries, function(key, entry){

                    if(entry.abstract){
                        text += entry.abstract + " ";
                    }
                });

                $(this).plotWordCloud({
                    title: "Word Cloud of Abstract (English)",
                    text: text
                });

                return $(this);
            });
        };

    }( jQuery ));
});
