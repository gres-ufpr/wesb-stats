(function( $ ) {

    $.modalViewData = function(title, field, ranking) {

        $("#modal-view-data .modal-title").html(title);

        // Remove all rows before adding new rows
        $("#table-view-data tbody").empty();
        $("#table-view-data th:nth-child(1)").html(field);

        $.each(ranking, function(index, item){
            appendRow("#table-view-data", [item.key.replace("###"," "), item.value]);
        });

        $('#modal-view-data').modal('show');
    };

    function appendRow(tableId, columns){

        var row = "<tr>";

    	$.each(columns, function(key, column){
            row += "<td>CONTENT</td>".replace("CONTENT", column);
    	});

    	row += "</tr>";

    	$(tableId+" > tbody").append(row);
    }

}( jQuery ));
