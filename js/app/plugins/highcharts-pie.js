define([
    'jquery',
    'highcharts',
    'highchartsExporting',
    'highchartsMore',
    'highchartsDrilldown',
], function($) {

    (function( $ ) {

        $.fn.plotPie = function(options) {

            var defaults = {
                title: "Title",
                height: 500,
                subtitle: "",
                series: [],
                categories: [],
                legendEnabled: false,
                exportingOnclick: null,
                dataLabelsEnable: true,
                yAxisTitle: "Number of Papers",
                drilldown: {},
            }

            var settings = $.extend( {}, defaults, options );

            console.log("Ploting " + settings.title);

            return this.each (function() {
                $(this).highcharts({
                     chart: {
                        type: 'pie',
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                     },
                     title: {
                         text: settings.title
                     },
                     subtitle: {
             			text: settings.subtitle
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
                     boost: {
                         useGPUTranslations: true
                     },
                     tooltip: {
                         pointFormat: 'Number of Papers: <b>{point.y}</b>'
                     },
                     plotOptions: {
                         pie: {
                             allowPointSelect: true,
                             cursor: 'pointer',
                             dataLabels: {
                                 enabled: true,
                                 format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                 style: {
                                     color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                 }
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
                     series: settings.series,
                     drilldown: settings.drilldown,
                 });
            });
        };

    }( jQuery ));
});
