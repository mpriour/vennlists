/* global d3:false, venn:false */
import "./node_modules/d3/build/d3.js";
import "./node_modules/venn.js/venn.js";

import {readJSON, getCombinations} from "./lib/helpers.js";
import List from "./lib/List.js";
import ListCollection from "./lib/ListCollection.js";

fetch("data/lists.json").then(readJSON).then(data => {
    let collect = new ListCollection({
        listsData: data,
        local: true
    });
    collect.loaded.then(c => {
        console.log(c.lists);
        const combos = getCombinations(Array.from(c.lists.keys()));
        const matrix = combos.reduce((m, combo) => {
            m.push(c.findUnions(combo));
            return m;
        }, []);
        console.log(matrix);
        drawChart(matrix, 800, 800);
    });
});

function drawChart(data, height, width){
    var chart = venn.VennDiagram()
        .width(width)
        .height(height);
    var div = d3.select("#venn")
    div.datum(data).call(chart);
    var tooltip = d3.select("body").append("div")
    .attr("class", "venntooltip");

    div.selectAll("path")
    .style("stroke-opacity", 0)
    .style("stroke", "#fff")
    .style("stroke-width", 3)
    
    div.selectAll("g")
    .on("mouseover", function(d, i) {
        // sort all the areas relative to the current item
        venn.sortAreas(div, d);
        // Display a tooltip with the current size
        tooltip.transition().duration(400).style("opacity", .9);
        tooltip.text(d.size + " users");
        // highlight the current path
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path")
            .style("fill-opacity", d.sets.length == 1 ? .4 : .1)
            .style("stroke-opacity", 1);
    })
    .on("mousemove", function() {
        tooltip.style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function(d, i) {
        tooltip.transition().duration(400).style("opacity", 0);
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path")
            .style("fill-opacity", d.sets.length == 1 ? .25 : .0)
            .style("stroke-opacity", 0);
    });
}