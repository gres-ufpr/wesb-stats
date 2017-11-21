define([
    'jquery',
    'sortBy',
    'find',
    'split',
    'insertUpdate',
    'plotWordCloud',
], function($, sortBy, find, split, insertUpdate) {

    (function( $ ) {

        $.fn.wordCloudAbstractPortuguese = function(entries) {

            return this.each (function() {

                var text = " ";

                $.each(entries, function(key, entry){

                    if(entry.custom_abstract){
                        text += entry.custom_abstract + " ";
                    }
                });

                $(this).plotWordCloud({
                    title: "Word Cloud of Abstract (Portuguese)",
                    text: text
                });

                return $(this);
            });
        };

    }( jQuery ));
});
