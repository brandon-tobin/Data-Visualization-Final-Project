/**
 * Constructor for the WorldChart
 */
function WorldChart(){

    var self = this;
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
    tip = d3.tip().attr('class', 'd3-tip')
        .direction('se')
        .offset(function() {
            return [0,0];
        })
        .html(function(d) {
            // console.log(d);
            var tooltip_data = "";
            if (d.I_Votes == 0)
            {
                tooltip_data = {
                    "state": d.State,
                    "winner": d.State_Winner,
                    "electoralVotes": d.Total_EV,
                    "result":[
                        {"nominee": d.D_Nominee_prop,"votecount": d.D_Votes,"percentage": d.D_Percentage,"party":"D"} ,
                        {"nominee": d.R_Nominee_prop,"votecount": d.R_Votes,"percentage": d.R_Percentage,"party":"R"}
                    ]};

            }
            else
            {
                tooltip_data = {
                    "state": d.State,
                    "winner": d.State_Winner,
                    "electoralVotes": d.Total_EV,
                    "result":[
                        {"nominee": d.D_Nominee_prop,"votecount": d.D_Votes,"percentage": d.D_Percentage,"party":"D"} ,
                        {"nominee": d.R_Nominee_prop,"votecount": d.R_Votes,"percentage": d.R_Percentage,"party":"R"} ,
                        {"nominee": d.I_Nominee_prop,"votecount": d.I_Votes,"percentage": d.I_Percentage,"party":"I"}
                    ]};

            }
            return self.tooltip_render(tooltip_data);
        });

    return self.readMapData(country_data, colorScale);
    // return self.drawMap(electionResult, colorScale);




    //Creates a legend element and assigns a scale that needs to be visualized
    // self.legendSvg.append("g")
    //     .attr("class", "legendQuantile");
    //
    // var legendQuantile = d3.legendColor()
    //     .shapeWidth(120)
    //     .cells(10)
    //     .orient('horizontal')
    //     .scale(colorScale);
    //
    // // ******* PART IV *******
    // //Tansform the legend element to appear in the center and make a call to this element for it to display.
    //
    // self.legendSvg.selectAll("g")
    //     .attr("transform", "translate(" + self.svgWidth/14 + ", 75) scale(.68)");
    //
    // self.legendSvg.selectAll("g")
    //     .call(legendQuantile);
    //
    // //Lay rectangles corresponding to each state according to the 'row' and 'column' information in the data.
    // var tileWidth = self.svgWidth / 12;
    // var tileHeight = self.svgHeight / 8;
    //
    // self.svg.call(tip);
    //
    // var groups = self.svg.selectAll("g").data(electionResult);
    //
    // var groupsEnter = groups.enter().append("g");
    // groupsEnter.append("rect");
    // groupsEnter.append("text").classed("state", true);
    // groupsEnter.append("text").classed("voteCount", true);
    //
    // groups = groups.merge(groupsEnter);
    //
    // groups.select("rect")
    //     .attr("x", function (d) {
    //         return d.Space * tileWidth;
    //     })
    //     .attr("y", function (d) {
    //         return d.Row * tileHeight;
    //     })
    //     .attr("width", tileWidth)
    //     .attr("height", tileHeight)
    //     //Use global color scale to color code the tiles.
    //     .attr("fill", function (d) {
    //         if (d.State_Winner == "I")
    //             return "#45AD6A";
    //         else
    //             return colorScale(d.RD_Difference);
    //     })
    //     .classed("tile", true)
    //     .on("mouseover", tip.show)projection
    //     .on("mouseout", tip.hide);
    //
    // //Display the state abbreviation and number of electoral votes on each of these rectangles
    // groups.select("text.state")
    //     .attr("x", function (d) {
    //         return (d.Space * tileWidth) + tileHeight/1.7;
    //     })
    //     .attr("y", function (d) {
    //         return (d.Row * tileHeight) + tileHeight/2;
    //     })
    //     .text( function (d) { return d.Abbreviation; })
    //     .classed("tilestext", true);
    //
    // groups.select("text.voteCount")
    //     .attr("x", function (d) {
    //         return (d.Space * tileWidth) + tileHeight/1.7;
    //     })
    //     .attr("y", function (d) {
    //         return (d.Row * tileHeight) + tileHeight/1.4;
    //     })
    //     .text( function (d) { return d.Total_EV; })
    //     .classed("tilestext", true);


    //HINT: Use .tile class to style your tiles;
    // .tilestext to style the text corresponding to tiles

    //Call the tool tip on hover over the tiles to display stateName, count of electoral votes
    //then, vote percentage and number of votes won by each party.
    //HINT: Use the .republican, .democrat and .independent classes to style your elements.
};

WorldChart.prototype.drawMap = function(world, countryCodes, country_data){

    var self = this;

    var min = d3.min(country_data, function (d) {
        if (d.Options.length > 0) {
            return parseInt(d.Options[2].Years[2013]);
        }
    });

    var max = d3.max(country_data, function (d) {
            if (d.Options.length > 0) {
                return parseInt(d.Options[2].Years[2013]);
            }
    });

    // colorScale.domain([min, max]);

    projection = d3.geoEquirectangular()
        .scale(self.svgHeight / Math.PI)
        .translate([self.svgWidth / 2, self.svgHeight / 2]);

    // ******* PART IV *******

    // Draw the background (country outlines; hint: use #map)
    // Make sure and add gridlines to the map

    // Hint: assign an id to each country path to make it easier to select afterwards
    // we suggest you use the variable in the data element's .id field to set the id

    // Make sure and give your paths the appropriate class (see the .css selectors at
    // the top of the provided html file)

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
                        return colorScale(data.Options[2].Years[2013]);
                }
            }
        })
        .on("click", function (d, i) {
            // console.log(d);
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

