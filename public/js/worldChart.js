var global_data = "";
var global_country_codes = "";
var global_world = "";
var global_world_map_self = "";

var global_country_data = "";

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

    self.svgWidth = 500;
    self.svgHeight = 500;
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
 * Creates tiles and tool tip for each state, legend for encoding the color scale information.
 *
 * @param electionResult election data for the year selected
 * @param colorScale global quantile scale based on the winning margin between republicans and democrats
 */
WorldChart.prototype.update = function(country_data, colorScale){
    var self = this;

    // Change method to setup!!!
    global_country_data = country_data;

    queue()
        .defer(d3.json, "data/newWorldCoords.json")
        .defer(d3.tsv, "data/newWorldCountryNames.tsv")
        .await(self.drawMap);
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

WorldChart.prototype.drawMap = function(error, world, countryCodes, country_data, year) {
    global_data = global_country_data;
    global_country_codes = countryCodes;
    global_world = world;
    var mapYear = "";
    var self = global_world_map_self;

    var countries = topojson.feature(world, world.objects.countries).features;

    if (year === undefined || year === null || year === "") {
        mapYear = parseInt(2013);
    }
    else{
        mapYear = parseInt(year);
    }

    var min = d3.min(global_data, function (d) {
        if (d.Options.length > 0) {
            return parseInt(d.Options[2].Years[mapYear]);
        }
    });

    var max = d3.max(global_data, function (d) {
            if (d.Options.length > 0) {
                return parseInt(d.Options[2].Years[mapYear]);
            }
    });

    var projection = d3.geoOrthographic()
        .scale(245)
        .rotate([0, 0])
        .translate([self.svgWidth / 2, self.svgHeight / 2])
        .clipAngle(90);

    var path = d3.geoPath()
        .projection(projection);

    colors = ["#ffe6e6", "#ffcccc","#ffb3b3","#ff8080", "#ff4d4d","#ff1a1a","#e60000","#b30000","#800000"];

    var buckets = 100000;

    var colorScale = d3.scaleQuantile()
        .domain([min, buckets - 1, max])
        .range(colors);

    var graticule = d3.geoGraticule();

    var drag = d3.drag()
        .subject(function() { var r = projection.rotate(); return {x: r[0] / .25, y: -r[1] / .25}; })
        .on("drag", function() {
            var rotate = projection.rotate();
            projection.rotate([d3.event.x * .25, -d3.event.y * .25, rotate[2]]);

            svg.selectAll(".graticule").attr("d", path);
            svg.selectAll(".country").attr("d", path);
        });

    //Tooltip Div
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var svg = self.svg;

    svg.selectAll("path")
        .data(countries)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "country")
        .attr("id", function (d) {
            return (d.id);
        })
        .attr("stroke", "#f7f7f7")
        .attr("fill", function (d) {
            var data = findData(d, countryCodes, global_data);

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
            var country_name = findData(d, countryCodes, global_data);
            console.log(country_name);
        })
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div	.html("<div id='FuelTypes'></div>"+
                    "<div id='CombustionFactors'></div>")
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");

            var country_name = findData(d, countryCodes, global_data);
            //TODO grab correct years
            map_tooltip(country_name.CodeThree, 1999, 2001)
        })
        .on("mouseout", function(d) {
            //TODO only do this when changing years scrubbed
            //setGlobal();
            div.transition()
                .duration(500)
                .style("opacity", 0);
            div.html("");
        });

    svg.insert("path", "path.countries")
        .datum(graticule)
        .attr("class", "graticule")
        .attr("d", path);

    svg.call(drag);
};

function findData (d, countryCodes, country_data)
{
    var country_name = "";
    for (var j = 0; j < countryCodes.length; j++)
    {
        if (countryCodes[j].id == d.id)
        {
            country_name = countryCodes[j].name;
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



