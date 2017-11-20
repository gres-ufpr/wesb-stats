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
