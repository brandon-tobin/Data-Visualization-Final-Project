/**
 * Adds the functionality to brush the years
 */
years = [1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013];
var selectedyear1 = years[0];
var selectedyear2 = years[years.length-1];
function createYear() {
    var margin = {top: 10, right: 40, bottom: 35, left: 40},
        width = 960 - margin.left - margin.right,
        height = 65 - margin.top - margin.bottom;

    x = d3.scaleBand()
        .domain(years)
        .range([0, width]);

    var svg = d3.select("#years").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "axis axis--grid")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(-height))
        .selectAll("text")
        .style("text-anchor","end")
        .attr("dx","0em")
        .attr("dy","1.5em")
        .attr("transform","translate(0, 30) rotate(90)")

        .style("font-size", "12px")


    svg.append("g")
        .attr("class", "brush")
        .call(d3.brushX()
            .extent([[0, 0], [width, height]])
            .on("end", brushended));
}
function brushended() {
    var self = this;
    selectedyear1 = years[0];
    selectedyear2 = years[years.length-1];
    if (!d3.event.sourceEvent) return; // Only transition after input.
    if (!d3.event.selection) return; // Ignore empty selections.

    var y = d3.event.selection;
    var eachBand = x.step();
    var index = Math.round((y[0] / eachBand));
    var year1 = x.domain()[index];

    index = Math.round((y[1] / eachBand));
    var year2 = x.domain()[index];

    if(year2 === undefined)
        year2 = years[years.length -1];

    if(year1 == undefined)
        year1 =year2;

    selectedyear1 = year1;
    selectedyear2 = year2;
    //


    _WordCloud.setGlobal(false);
    //Wait for the data to reload
    setTimeout(function(){
        chooseData();
    }, 100);

}