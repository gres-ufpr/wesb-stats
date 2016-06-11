function Highcharts () {}

Highcharts.plotBubbleChart = function(options){
	$(options.elementId).highcharts({
        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy',
			height: options.height || 500,
        },
        legend: {
            enabled: false
        },
        title: {
            text: options.title
        },
        subtitle: {
			text: options.subtitle || 'An Estimate'
		},
        xAxis: {
            min: -1,
            max: options.categoryOne.length,
            gridLineWidth: 1,
			tickInterval: 1,
			labels: {
                rotation: -45,
                formatter: function() {
                    return options.categoryOne[this.value];
				},
            }
        },
		yAxis: {
            min: -1,
            max: options.categoryTwo.length,
			tickInterval: 1,
			title: {
				text: ""
			},
			labels: {
                formatter: function() {
                    return options.categoryTwo[this.value];
				}
            },

        },
        tooltip: {
			formatter: function(){
				return "<b>"+options.categoryTwo[this.point.y]+" and "+options.categoryOne[this.point.x] + "</b><br> Number of Papers: "+this.point.z;
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
                    x: -40,
                    onclick: options.viewData,
                    text: "View data"
                }
            }
        },
		credits: {
            enabled: false
        },
        series: options.series
    });
};

Highcharts.plotHorizontalColumnChart = function(options){

	$(options.elementId).highcharts({
        chart: {
            type: 'bar',
            height: options.height || 500,
        },
        title: {
            text: options.title
        },
		subtitle: {
			text: options.subtitle || 'An Estimate'
		},
        xAxis: {
            categories: options.categories,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: options.yAxisTitle || 'Number of Papers',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        legend: {
            enabled: options.enabledLegend || false,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
		exporting: {
            buttons: {
                customButton: {
                    x: -40,
                    onclick: options.viewData,
                    text: "View data"
                }
            }
        },
        credits: {
            enabled: false
        },
        series: options.series
    });
};

Highcharts.plotPieChart = function(options){
    $(options.elementId).highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: options.height || 500,
        },
        title: {
            text: options.title
        },
        subtitle: {
           text: options.subtitle || 'An Estimate'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>'
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
        credits: {
            enabled: false
        },
		exporting: {
            buttons: {
                customButton: {
                    x: -40,
                    onclick: options.viewData,
                    text: "View data"
                }
            }
        },
        series: [{
            name: 'Number of Papers',
            colorByPoint: true,
            data: options.data
        }]
    });
};

Highcharts.plotColumnChar = function(options){
    $(options.elementId).highcharts({
         chart: {
             type: 'column',
             height: options.height || 500,
         },
         title: {
             text: options.title
         },
         subtitle: {
 			text: options.subtitle || 'An Estimate'
 		 },
         xAxis: {
             categories: options.categories,
         },
         yAxis: {
             min: 0,
             title: {
                 text: options.yAxisTitle || 'Number of Papers',
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
             enabled: options.legendEnabled || false,
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
                     onclick: options.viewData,
                     text: "View data"
                 }
             }
         },
         credits: {
             enabled: false
         },
         series: options.series
     });
};
