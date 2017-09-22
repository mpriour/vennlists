/* global d3:false, venn:false */
import "./node_modules/d3/build/d3.js";
import "./node_modules/venn.js/venn.js";

import {readJSON} from "./lib/helpers.js";
import List from "./lib/List.js"

fetch("data/lists.json").then(readJSON).then(data => {
    /* let listsReqs = data.lists.map( list => fetch("data/" + list.slug + ".json").then(readJSON) );
    Promise.all(listsReqs).then(results => console.log(results)); */
    let lists = data.lists.map( list => {
        return new List({
            handle: "mattpriour",
            slug: list.slug,
            path: "data/" + list.slug + ".json"
        });
    } );
    Promise.all(lists.map( li => li.loaded )).then(results => console.log(results));
});