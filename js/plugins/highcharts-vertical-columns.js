(function( $ ) {

    $.fn.plotVerticalColumns = function(options) {

        console.log("Ploting vertical columns");

        var defaults = {
            title: "Title",
            subtitle: "An Estimate",
            series: [],
            categories: [],
            legendEnabled: false,
            yAxisTitle: "Number of Papers"
        }

        var settings = $.extend( {}, defaults, options );

        return this.each (function() {
            $(this).highcharts({
                 chart: {
                     type: 'column',
                     height: 200 || 500,
                 },
                 title: {
                     text: settings.title
                 },
                 subtitle: {
         			text: settings.subtitle
         		 },
                 xAxis: {
                     categories: settings.categories
                 },
                 yAxis: {
                     min: 0,
                     title: {
                         text: settings.yAxisTitle,
                     },
                     stackLabels: {
                         enabled: true,
                         style: {
                             fontWeight: 'bold',
                             color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                         }
                     }
                 },
                 legend: {
                     enabled: settings.legendEnabled,
                     align: 'right',
                     x: -30,
                     verticalAlign: 'top',
                     y: 30,
                     floating: true,
                     backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                     borderColor: '#CCC',
                     borderWidth: 1,
                     shadow: false
                 },
                 tooltip: {
                     pointFormat: 'Number of Papers: {point.stackTotal}',
                 },
                 plotOptions: {
                     column: {
                         stacking: 'normal',
                         dataLabels: {
                             enabled: true,
                             color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                             style: {
                                 textShadow: '0 0 3px black'
                             },
                             formatter: function() {
                                 if (this.y !== 0) {
                                     return this.y;
                                 } else {
                                     return null;
                                 }
                            }
                         }
                     }
                 },
                 exporting: {
                     buttons: {
                         customButton: {
                             x: -40,
                            // onclick: options.viewData,
                             text: "View data"
                         }
                     }
                 },
                 credits: {
                     enabled: false
                 },
                 series: settings.series
             });
        });
    };

}( jQuery ));
