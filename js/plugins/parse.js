(function( $ ) {

  $.parse = function(content) {

    console.log("Parsing the entries")

    // Creating the bibtex object for parse the bibtext file
    var bibtex = new BibTex();

    // Getting the div's content for parse it
    bibtex.content = content;

    // Parse the bibtext file
    bibtex.parse();

    // Array with all entries
    var entries = [];

    // Save all converted entries
    for (var index = 0; index < bibtex.data.length; index++) {
      entries.push(bibtex.data[index]);
    }

    return entries;
  };

}( jQuery ));
