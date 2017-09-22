/* global d3:false, venn:false */
import "./node_modules/d3/build/d3.js";
import "./node_modules/venn.js/venn.js";

import {readJSON} from "./lib/helpers.js";

fetch("data/lists.json").then(readJSON).then(data => {
    let listsReqs = data.lists.map( list => fetch("data/" + list.slug + ".json").then(readJSON) );
    Promise.all(listsReqs).then(results => console.log(results));
});