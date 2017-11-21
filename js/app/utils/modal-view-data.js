define(['jquery','bootstrap'], function($) {

    return function(title, field, ranking) {

        $("#modal-view-data .modal-title").html(title);

        // Remove all rows before adding new rows
        $("#table-view-data tbody").empty();
        $("#table-view-data th:nth-child(1)").html(field);

        $.each(ranking, function(index, item){

            var col1 = item.key;

            if( ! col1){
                col1 = item.name;
            }

            var col2 = item.value;

            if( ! col2){
                col2 = item.weight;
            }

           appendRow("#table-view-data", [col1.replace("###"," "), col2]);
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

});
