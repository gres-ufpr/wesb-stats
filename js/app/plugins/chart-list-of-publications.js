define([
    'jquery',
    'sortBy',
    'find',
    'returnJust',
    'insertUpdate',
    'plotVerticalColumns',
    'datatables.net',
    'dataTableBootstrap',
    'datatables.net-buttons',
    'dataTableColVis',
    'publications',
], function($, sortBy, find, returnJust, insertUpdate, DataTable) {

    (function( $ ) {

        $.fn.listOfPublications = function(entries) {

            return this.each (function() {

                var html = ' \
                    <p class="title">List of Publications</p> \
                    <div class="chart-text-body"> \
                        <table id="table-list-of-publications" class="table table-striped table-bordered" cellspacing="0" width="100%"> \
                            <thead> \
                                <tr> \
                                    <th>Year</th> \
                                    <th>Reference</th> \
                                    <th>Application</th> \
                                    <th>University</th> \
                                    <th>Algorithm</th> \
                                    <th>Language</th> \
                                    <th>Study Type</th> \
                                    <th>Instance Type</th> \
                                    <th>Statistical Test</th> \
                                    <th>Evaluation Method</th> \
                                </tr> \
                            </thead> \
                            <tbody> \
                            </tbody> \
                        </table> \
                    </div> \
                ';

                $(this).html(html);

                tableListOfPublications = $(this).find("#table-list-of-publications").DataTable({
                    "order": [[ 0, "desc" ]],   // Sort by year. Newer first.
                    columnDefs: [
                        { width: 20, targets: 0 }
                    ],
                    dom: 'Bfrtip',
                    buttons: [
                        'colvis'
                    ],
                    "aoColumnDefs": [{ "bVisible": false, "aTargets": [2,3,4,5,6,7,8,9] }],
                    "autoWidth": false,
                    "lengthMenu": [[5, 10, 25, 50, 100, -1], [5, 10, 25, 50, 100, "All"]],
                    "iDisplayLength": 5
            	});

                $.each(entries, function(key, entry){
                    // Append new row
                	tableListOfPublications.row.add( [
                		entry.year.trim(),          // YEAR COLUMN
                		new Publications().convertEntryToReference(entry).trim(),    // PUBLICATION COLUMN
                        entry.custom_application.trim(),
                        entry.custom_ies.trim(),
                        entry.custom_algorithm.trim(),
                        entry.custom_language.trim(),
                        entry.custom_study_type.trim(),
                        entry.custom_instance_type.trim(),
                        entry.custom_statistical_test.trim(),
                        entry.custom_evaluation_method.trim(),
                    ]);
                });

                tableListOfPublications.draw( false );

                return $(this);
            });
        };

    }( jQuery ));
});
