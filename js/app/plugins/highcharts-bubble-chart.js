define([
    'jquery',
    'highcharts',
    'highchartsExporting',
    'highchartsMore',
    'highchartsDrilldown',
], function($) {

    (function( $ ) {

        $.fn.plotBubbleChart = function(options) {

            var defaults = {
                title: "Title",
                height: 500,
                subtitle: "An Estimate",
                series: [],
                categoriesForXAxis: [],
                categoriesForYAxis: [],
                legendEnabled: false,
                exportingOnclick: null,
                dataLabelsEnable: true,
                yAxisTitle: "Number of Papers"
            }

            var settings = $.extend( {}, defaults, options );

            console.log("Ploting " + settings.title);

            return this.each (function() {
                $(this).highcharts({
                     chart: {
                         type: 'bubble',
                         plotBorderWidth: 1,
                         zoomType: 'xy',
                         height: settings.height,
                     },
                     title: {
                         text: settings.title
                     },
                     subtitle: {
             			text: settings.subtitle
             		 },
                     xAxis: {
                         min: -1,
                         max: settings.categoriesForXAxis.length,
                         gridLineWidth: 1,
             			tickInterval: 1,
             			labels: {
                             rotation: -45,
                             formatter: function() {
                                 return settings.categoriesForXAxis[this.value];
             				},
                         }
                     },
                     yAxis: {
                         min: -1,
                         max: settings.categoriesForYAxis.length,
                         tickInterval: 1,
                         title: {
                             text: ""
                         },
                         labels: {
                             formatter: function() {
                                 return settings.categoriesForYAxis[this.value];
                             }
                         },

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
             			formatter: function(){
             				return "<b>"+settings.categoriesForXAxis[this.point.x]+" and "+settings.categoriesForYAxis[this.point.y] + "</b><br> Number of Papers: "+this.point.z;
             			}
                     },
                     plotOptions: {
                         series: {
                             dataLabels: {
                                 enabled: true,
                                 format: '{point.z}'
                             }
                         }
                     },
                     exporting: {
                         buttons: {
                             customButton: {
                                 onclick: settings.exportingOnclick,
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
});
