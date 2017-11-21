define([
    'jquery',
    'find',
    'd3js',
    'd3jsv4',
], function($, find, d3, d4) {

    (function( $ ) {

        $.fn.forceDirectedGraph = function(nodes, links) {

            var color = d4.scaleOrdinal(d4.schemeCategory20);

            var id = "#"+$(this).attr('id');

            var width = $(id).parent().width(),
                height = $(id).parent().height()

            var svg = d3.select(id)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .call(d3.behavior.zoom().on("zoom", function (event) {
                    svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
                }))
                .append("g");

            var force = d3.layout.force()
                .gravity(0.01)
                .distance(150)
                .charge(-150)
                .size([width, height]);

            force.nodes(nodes)
                .links(links)
                .start();

            var link = svg.selectAll(".link")
                .data(links)
                .enter().append("line")
                .attr("class", "link");

            var node = svg.selectAll(".node")
                .data(nodes)
                .enter().append("g")
                .attr("class", "node")
                .call(force.drag);

            node.append("circle")
                .attr("r", function(d) { return 10; })
                .attr("fill", function(d) { return color(d.group); })

            node.append("text")
                .attr("dx", 12)
                .attr("dy", ".35em")
                .text(function(d) { return d.name });

            force.on("tick", function() {

                link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

                node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
            });
//});

          //   var svg = d3.select("#"+$(this).attr('id'))
          //         .append("svg")
          //         .attr("width", "100%")
          //         .attr("height", "100%")
          //         // .call(d3.behavior.zoom().on("zoom", function () {
          //         //   svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
          //         // }))
          //         .append("g");
          //
          //     var width = $(document).width();
          //     var height = $("#"+$(this).attr('id')).height();
          //
          // // var force = d3.layout.force()
          // //       .gravity(0.05)
          // //       .distance(100)
          // //       .charge(-100)
          // //       .size([width, height]);
          //
          //   var simulation = d3.forceSimulation()
          //       .force("link", d3.forceLink().id(function(d) { return d.id; }))
          //       .force("charge", d3.forceManyBody())
          //       .force("center", d3.forceCenter(width / 2, (height / 2)-50));
          //
          //   var color = d3.scaleOrdinal(d3.schemeCategory20);
          //
          //   var link = svg.append("g")
          //       .attr("class", "links")
          //       .selectAll("line")
          //       .data(links)
          //       .enter().append("line")
          //       .attr("stroke-width", function(d) { return Math.sqrt(d.value); });
          //
          //   var node = svg.append("g")
          //       .attr("class", "nodes")
          //       .selectAll("circle")
          //       .data(nodes)
          //       .enter().append("circle")
          //       .attr("r", 10)
          //       .text(function (d) { return d.id.split(" ")[0];})
          //       .attr("fill", function(d) { return color(d.group); })
          //       .call(d3.drag()
          //           .on("start", dragstarted)
          //           .on("drag", dragged)
          //           .on("end", dragended));
          //
          //   // node.append("title").text(function(d) {
          //   //     return d.id;
          //   // });
          //
          //   node.append("text")
          // .attr("dx", 12)
          // .attr("dy", ".35em")
          // .text(function(d) { return d.id });
          //
          //   simulation
          //       .nodes(nodes)
          //       .on("tick", ticked);
          //
          //   simulation.force("link")
          //       .links(links);
          //
          //   function ticked() {
          //     link
          //         .attr("x1", function(d) { return d.source.x; })
          //         .attr("y1", function(d) { return d.source.y; })
          //         .attr("x2", function(d) { return d.target.x; })
          //         .attr("y2", function(d) { return d.target.y; });
          //
          //     node
          //         .attr("cx", function(d) { return d.x; })
          //         .attr("cy", function(d) { return d.y; });
          //   }
          //
          //   function dragstarted(d) {
          //     //if (!d3.event.active) simulation.alphaTarget(0.3).restart();
          //     if (!d3.event.active) simulation.alphaTarget(0.3).restart();
          //     d.fx = d.x;
          //     d.fy = d.y;
          //   }
          //
          //   function dragged(d) {
          //     d.fx = d3.event.x;
          //     d.fy = d3.event.y;
          //   }
          //
          //   function dragended(d) {
          //     if (!d3.event.active) simulation.alphaTarget(0);
          //     d.fx = null;
          //     d.fy = null;
          //   }


        }
    }( jQuery ));
});
