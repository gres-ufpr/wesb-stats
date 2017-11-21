define([
    'jquery',
    'unique',
    'split',
    'sortBy',
    'find',
    'insertUpdate',
    'modalView',
], function($, unique, split, sortBy, find, insertUpdate, modalViewData) {

    (function( $ ) {

        function plot(that, entries, field, title){

            var array = [];

            $.each(entries, function(key, entry){

                var values = unique(split(entry[field], " and "));

                $.each(values, function(key, value){
                    array = insertUpdate(array, value);
                });
            });

            array = sortBy("value", array, "asc");

            var total = [];

            $.each(array, function(idRanking, item){
                total.push({name: item.key, y: item.value})
            });

            that.find("#chart-plot-pie").plotPie({
                title: "Number of Publications by " + title,
                exportingOnclick: function(){
                    modalViewData("Number of Publications by " + title, title, array);
                },
                series: [{
                    colorByPoint: true,
                    data: total
                }]
            });
        }

        $.fn.dynamicPieChart = function(entries) {

            return this.each (function() {

                var html = ' \
                <div class="chart-panel"> \
                    <div class="row"> \
                        <div class="col-sm-2"> \
                            <div class="form-group"> \
                                <label for="dimensions">Dimension</label> \
                                <select class="form-control" id="dimensions"> \
                                    <option value="custom_study_type">Study Type</option> \
                                    <option value="custom_instance_type">Instance Type</option> \
                                    <option value="custom_statistical_test">Statistical Test</option> \
                                    <option value="custom_evaluation_method">Evaluation Method</option> \
                                    <option value="custom_language">Language</option> \
                                    <option value="custom_ies">University</option> \
                                </select> \
                            </div> \
                        </div> \
                        <div class="col-sm-offset-10"></div> \
                    </div> \
                </div> \
                <div style="height: 400px" id="chart-plot-pie"></div> \
                ';

                $(this).html(html);

                var that = $(this);

                $(this).find("select").change(function(event){

                    var field = $(this).val().trim();
                    var title = $(this).find("option:selected").text();

                    plot(that, entries, field, title);
                });

                plot(that, entries, "custom_study_type", "Study Type");

                return $(this);
            });
        };

    }( jQuery ));
});
