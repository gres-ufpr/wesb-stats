define([
    'jquery',
    'unique',
    'split',
    'sortBy',
    'find',
    'insertUpdate',
    'modalView',
    'plotBubbleChart',
], function($, unique, split, sortBy, find, insertUpdate, modalViewData) {

    (function( $ ) {

        function plot(that, entries, fieldX, fieldY, titleX, titleY, color){

            var array = [];

            $.each(entries, function(key, entry){

                var valuesForX = unique(split(entry[fieldX], " and "));
                var valuesForY = unique(split(entry[fieldY], " and "));

                $.each(valuesForX, function(key, valueX){
                    $.each(valuesForY, function(key, valueY){
                        array = insertUpdate(array, valueX+"###"+valueY);
                    });
                });
            });

            array = sortBy("value", array, "asc");

            var categoriesForXAxis = [];
            var categoriesForYAxis = [];

        	$.each(array, function(key, entry){

                var split = entry.key.split("###");

                if(categoriesForXAxis.indexOf(split[0]) === -1)
                    categoriesForXAxis.push(split[0]);

                if(categoriesForYAxis.indexOf(split[1]) === -1)
                    categoriesForYAxis.push(split[1]);
        	});

            categoriesForXAxis = categoriesForXAxis.sort();
            categoriesForYAxis = categoriesForYAxis.sort();

            var data = [];

            $.each(array, function(key, entry){

            	var split = entry.key.split("###");

                data.push({
                    x: parseInt(categoriesForXAxis.indexOf(split[0])),
                    y: parseInt(categoriesForYAxis.indexOf(split[1])),
                    z: entry.value,
                });
        	});

            that.find("#chart-two-dimensions").plotBubbleChart({
                title: "Number of Publications by " + titleX + " and " + titleY,
                categoriesForXAxis: categoriesForXAxis,
                categoriesForYAxis: categoriesForYAxis,
                exportingOnclick: function(){
                    modalViewData("Number of Publications by " + titleX + " and " + titleY, titleX + " and " + titleY, array);
                },
                series: [{ color: color, data: data}]
            });
        }

        $.fn.dynamicBubbleChart = function(entries) {

            return this.each (function() {

                var html = ' \
                    <div class="row"> \
                        <div class="col-sm-2"> \
                            <div class="form-group"> \
                            <label for="bubble-chart-x-axis">X Axis</label> \
                                <select class="form-control" id="bubble-chart-x-axis" class="bubble-chart"> \
                                    <option selected value="year">Year</option> \
                                    <option value="custom_algorithm">Algorithm</option> \
                                    <option value="custom_ies">University</option> \
                                    <option value="custom_application">Application</option> \
                                    <option value="custom_study_type">Study Type</option> \
                                    <option value="custom_instance_type">Instance Type</option> \
                                    <option value="custom_statistical_test">Statistical Test</option> \
                                    <option value="custom_evaluation_method">Evaluation Method</option> \
                                    <option value="custom_language">Language</option> \
                                </select> \
                            </div> \
                        </div> \
                        <div class="col-sm-2"> \
                            <div class="form-group"> \
                            <label for="bubble-chart-y-axis">Y Axis</label> \
                                <select class="form-control" id="bubble-chart-y-axis" class="bubble-chart"> \
                                    <option value="year">Year</option> \
                                    <option selected value="custom_algorithm">Algorithm</option> \
                                    <option value="custom_ies">University</option> \
                                    <option value="custom_application">Application</option> \
                                    <option value="custom_study_type">Study Type</option> \
                                    <option value="custom_instance_type">Instance Type</option> \
                                    <option value="custom_statistical_test">Statistical Test</option> \
                                    <option value="custom_evaluation_method">Evaluation Method</option> \
                                    <option value="custom_language">Language</option> \
                                </select> \
                            </div> \
                        </div> \
                        <div class="col-sm-2"> \
                            <div class="form-group"> \
                                <label for="color">Color:</label> \
                                <select class="form-control" id="color"> \
                                    <option selected value="#7cb5ec">Blue</option> \
                                    <option value="#434348">Black</option> \
                                    <option value="#90ed7d">Green</option> \
                                    <option value="#f7a35c">Orange</option> \
                                    <option value="#8085e9">Purple</option> \
                                    <option value="#f15c80">Pink</option> \
                                    <option value="#e4d354">Yellow</option> \
                                    <option value="#2b908f">Cornflower Blue</option> \
                                    <option value="#f45b5b">Red</option> \
                                    <option value="#91e8e1">Aquamarine</option> \
                                </select> \
                            </div> \
                        </div> \
                        <div class="col-sm-offset-6"></div> \
                    </div> \
                <div style="height: 500px" id="chart-two-dimensions"></div> \
                ';

                $(this).html(html);

                var that = $(this);

                $(this).find("select").change(function(event){

                    event.preventDefault();

                    var fieldX = that.find("#bubble-chart-x-axis option:selected" ).val().trim();
                    var fieldY = that.find("#bubble-chart-y-axis option:selected" ).val().trim();

                    var titleX = that.find("#bubble-chart-x-axis option:selected" ).text();
                    var titleY = that.find("#bubble-chart-y-axis option:selected" ).text();

                    var color = that.find("#color option:selected" ).val().trim();

                    plot(that, entries, fieldX, fieldY, titleX, titleY, color);
                });

                plot(that, entries, "year", "custom_algorithm", "Year", "Algorithm", "#7cb5ec");

                return $(this);
            });
        };

    }( jQuery ));
});
