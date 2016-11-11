var global_data = "";
var global_country_codes = "";
var global_world = "";
var global_world_map_self = "";

/**
 * Constructor for the WorldChart
 */
function WorldChart(){

    var self = this;
    global_world_map_self = this;
    self.init();
};



/**
 * Initializes the svg elements required to lay the tiles
 * and to populate the legend.
 */
WorldChart.prototype.init = function(){
    var self = this;

    //Gets access to the div element created for this chart and legend element from HTML
    var divTileChart = d3.select("#tiles").classed("content", true);
    var legend = d3.select("#legend").classed("content",true);
    self.margin = {top: 30, right: 20, bottom: 30, left: 50};

    // var svgBounds = divTileChart.node().getBoundingClientRect();
    // self.svgWidth = svgBounds.width - self.margin.left - self.margin.right;
    // self.svgHeight = self.svgWidth/2;
    // var legendHeight = 150;

    self.svgWidth = 1500;
    self.svgHeight = 1500 / 2;
    var legendHeight = 150;

    //creates svg elements within the div
    self.legendSvg = legend.append("svg")
        .attr("width",self.svgWidth)
        .attr("height",legendHeight)
        .attr("transform", "translate(" + self.margin.left + ",0)");

    self.svg = divTileChart.append("svg")
        .attr("width",self.svgWidth)
        .attr("height",self.svgHeight)
        .attr("transform", "translate(" + self.margin.left + ",0)")
        .style("bgcolor","green");

};

/**
 * Returns the class that needs to be assigned to an element.
 *
 * @param party an ID for the party that is being referred to.
 */
WorldChart.prototype.chooseClass = function (party) {
    var self = this;
    if (party == "R"){
        return "republican";
    }
    else if (party== "D"){
        return "democrat";
    }
    else if (party == "I"){
        return "independent";
    }
}

/**
 * Renders the HTML content for tool tip.
 *
 * @param tooltip_data information that needs to be populated in the tool tip
 * @return text HTML content for tool tip
 */
WorldChart.prototype.tooltip_render = function (tooltip_data) {
    var self = this;
    var text = "<h2 class ="  + self.chooseClass(tooltip_data.winner) + " >" + tooltip_data.state + "</h2>";
    text +=  "Electoral Votes: " + tooltip_data.electoralVotes;
    text += "<ul>";
    tooltip_data.result.forEach(function(row){
        text += "<li class = " + self.chooseClass(row.party)+ ">" + row.nominee+":\t\t"+row.votecount+"("+row.percentage+"%)" + "</li>"
    });
    text += "</ul>";
    return text;
}

/**
 * Creates tiles and tool tip for each state, legend for encoding the color scale information.
 *
 * @param electionResult election data for the year selected
 * @param colorScale global quantile scale based on the winning margin between republicans and democrats
 */
WorldChart.prototype.update = function(country_data, colorScale){
    var self = this;

    //Calculates the maximum number of columns to be laid out on the svg
    // self.maxColumns = d3.max(electionResult,function(d){
    //     return parseInt(d["Space"]);
    // });
    //
    // //Calculates the maximum number of rows to be laid out on the svg
    // self.maxRows = d3.max(electionResult,function(d){
    //     return parseInt(d["Row"]);
    // });
    //for reference:https://github.com/Caged/d3-tip
    //Use this tool tip element to handle any hover over the chart
    // tip = d3.tip().attr('class', 'd3-tip')
    //     .direction('se')
    //     .offset(function() {
    //         return [0,0];
    //     })
    //     .html(function(d) {
    //         // console.log(d);
    //         var tooltip_data = "";
    //         if (d.I_Votes == 0)
    //         {
    //             tooltip_data = {
    //                 "state": d.State,
    //                 "winner": d.State_Winner,
    //                 "electoralVotes": d.Total_EV,
    //                 "result":[
    //                     {"nominee": d.D_Nominee_prop,"votecount": d.D_Votes,"percentage": d.D_Percentage,"party":"D"} ,
    //                     {"nominee": d.R_Nominee_prop,"votecount": d.R_Votes,"percentage": d.R_Percentage,"party":"R"}
    //                 ]};
    //
    //         }
    //         else
    //         {
    //             tooltip_data = {
    //                 "state": d.State,
    //                 "winner": d.State_Winner,
    //                 "electoralVotes": d.Total_EV,
    //                 "result":[
    //                     {"nominee": d.D_Nominee_prop,"votecount": d.D_Votes,"percentage": d.D_Percentage,"party":"D"} ,
    //                     {"nominee": d.R_Nominee_prop,"votecount": d.R_Votes,"percentage": d.R_Percentage,"party":"R"} ,
    //                     {"nominee": d.I_Nominee_prop,"votecount": d.I_Votes,"percentage": d.I_Percentage,"party":"I"}
    //                 ]};
    //
    //         }
    //         return self.tooltip_render(tooltip_data);
    //     });

    return self.readMapData(country_data, colorScale);
};

function updateMap (year, selected_data) {

    var svg = global_world_map_self.svg;
    var world = global_world;
    var countryCodes = global_country_codes;
    var country_data = global_data;


    var mapYear = "";

    if (year === undefined || year === null || year === "") {
        mapYear = parseInt(2013);
    }
    else
    {
        mapYear = parseInt(year);
    }

    var min = d3.min(country_data, function (d) {
        if (d.Options.length > 0) {
            return parseInt(d.Options[selected_data].Years[mapYear]);
        }
    });

    var max = d3.max(country_data, function (d) {
        if (d.Options.length > 0) {
            return parseInt(d.Options[selected_data].Years[mapYear]);
        }
    });

    colors = ["#ffe6e6", "#ffcccc","#ffb3b3","#ff8080", "#ff4d4d","#ff1a1a","#e60000","#b30000","#800000"];

    var buckets = 100000;

    var colorScale = d3.scaleQuantile()
        .domain([min, buckets - 1, max])
        .range(colors);


    svg.selectAll("path")
        .data(topojson.feature(world, world.objects.countries).features)
        .attr("fill", function (d) {
            var data = findData(d, countryCodes, country_data);

            if (data === undefined || data === null || data.Options.length == 0) {
                return "#d9d9d9";
            }
            else
            {
                if (data.Options.length > 0)
                {
                    if (data.Options[selected_data].Years[mapYear] == "..")
                        return "#5f6a6a";
                    else
                        return colorScale(data.Options[selected_data].Years[mapYear]);
                }
            }
        });
}

WorldChart.prototype.drawMap = function(world, countryCodes, country_data, year) {
    global_data = country_data;
    global_country_codes = countryCodes;
    global_world = world;
    var mapYear = "";
    var self = this;

    if (year === undefined || year === null || year === "") {
        mapYear = parseInt(2013);
    }
    else
    {
        mapYear = parseInt(year);
    }

    var min = d3.min(country_data, function (d) {
        if (d.Options.length > 0) {
            return parseInt(d.Options[2].Years[mapYear]);
        }
    });

    var max = d3.max(country_data, function (d) {
            if (d.Options.length > 0) {
                return parseInt(d.Options[2].Years[mapYear]);
            }
    });

    // colorScale.domain([min, max]);

    projection = d3.geoEquirectangular()
        .scale(self.svgHeight / Math.PI)
        .translate([self.svgWidth / 2, self.svgHeight / 2]);

    var path = d3.geoPath()
        .projection(projection);

    // var colorScale = d3.scaleLinear()
    //     .domain([min, max])
    //     .range(["#f2d7d5", "#641e16"]);


    colors = ["#ffe6e6", "#ffcccc","#ffb3b3","#ff8080", "#ff4d4d","#ff1a1a","#e60000","#b30000","#800000"];

    var buckets = 100000;

    var colorScale = d3.scaleQuantile()
        .domain([min, buckets - 1, max])
        .range(colors);


    var svg = self.svg;

    svg.selectAll("path")
        .data(topojson.feature(world, world.objects.countries).features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("id", function (d) {
            return (d.id);
        })
        .attr("stroke", "#f7f7f7")
        .attr("fill", function (d) {
            var data = findData(d, countryCodes, country_data);

            if (data === undefined || data === null || data.Options.length == 0) {
                return "#d9d9d9";
            }
            else
            {
                if (data.Options.length > 0)
                {
                    if (data.Options[2].Years[2013] == "..")
                        return "#5f6a6a";
                    else
                        return colorScale(data.Options[2].Years[mapYear]);
                }
            }
        })
        .on("click", function (d, i) {
            var country_name = findData(d, countryCodes, country_data);
            console.log(country_name);
        });
};

WorldChart.prototype.readMapData = function(country_data, colorScale) {
    var self = this;

    d3.json("data/world.json", function (error, world) {
        d3.csv("data/CountryCodes.csv", function (error, countryCodes) {
            if (error) throw error;
            self.drawMap(world, countryCodes, country_data, colorScale);
        })
    });
};

function findData (d, countryCodes, country_data)
{
    var country_name = "";
    for (var j = 0; j < countryCodes.length; j++)
    {
        if (countryCodes[j].CodeThree == d.id)
        {
            country_name = countryCodes[j].Name;
            break;
        }
    }

    for (j = 0; j < country_data.length; j++)
    {
        if (country_data[j].Name == country_name)
        {
            return (country_data[j]);
        }
    }
}

function chooseData() {

    //Changed the selected data when a user selects a different
    // menu item from the drop down.

    var year = document.getElementById('world_year').value;
    var data = document.getElementById('world_data').value;
    updateMap(year, data);
}



