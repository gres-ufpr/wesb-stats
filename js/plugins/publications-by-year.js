(function( $ ) {

    $.fn.publicationsByYear = function(entries) {

        console.log("Generating Number of Publications by Year")

        return this.each (function() {

            var ranking = [];

            $.each(entries, function(key, entry){

                //if( ! $.containsKey(ranking, entry.year)){
                    ranking.push({entry.year: 2});
                //}

                //ranking[entry.year]++;
            });



            $(this).plotVerticalColumns({
                title: "Number of Publications by Year",
                subtitle: null,
                categories: Object.keys(ranking),
                series: [{
                    name: 'Tokyo',
                    data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                }],
                data: ranking
            });

            return $(this);
        });
    };

}( jQuery ));
