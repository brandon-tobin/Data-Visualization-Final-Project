/**
 * Constructor for the Year Chart
 *
 * @param electoralVoteChart instance of ElectoralVoteChart
 * @param worldChart instance of WorldChart
 * @param votePercentageChart instance of Vote Percentage Chart
 * @param electionInfo instance of ElectionInfo
 * @param electionWinners data corresponding to the winning parties over mutiple election years
 */
function WordCloud(worldChart) {
    var self = this;

    self.worldChart = worldChart;

    self.init();
};

/**
 * Initializes the svg elements required for this chart
 */
WordCloud.prototype.init = function(){

    var self = this;
    self.margin = {top: 10, right: 20, bottom: 30, left: 50};
    var divyearChart = d3.select("#year-chart").classed("fullView", true);

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = divyearChart.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 100;

    //creates svg element within the div
    self.svg = divyearChart.append("svg")
        .attr("width",self.svgWidth)
        .attr("height",self.svgHeight)

};

/**
 * Creates a chart with circles representing each election year, populates text content and other required elements for the Year Chart
 */
WordCloud.prototype.update = function(){
    var self = this;

    d3.csv("data/CountryDataByYear.csv", function (error, cData) {
        d3.csv("data/countries.csv", function (error, countries) {

            country_data = [];
            countries.forEach(function(c,i){
                _country = c;
                var cDataFiltered = cData.filter(function(d){return d["Country Name"] ==_country.Country;});

                options = [];

                var codeThree = "";

                cDataFiltered.forEach(function(d, i){
                    codeThree = d["Country Code"];
                    var o ={};
                    o.Name = d["Series Name"];
                    // o.CodeThree = d["Country Code"];
                    o.Years = {};

                    for(var i = 1990; i<= 2016; i++){
                        o.Years[i] = d[i + " [YR" + i + "]"];
                    }
                    options.push(o);
                });

                // console.log(c);

                var cPack = {};
                cPack.Name = c["Country"];
                cPack.Code = c["Country code"];
                cPack.CodeThree = codeThree;
                cPack.Info = c;
                cPack.Options = options;
                country_data.push(cPack);
            });

            // console.log(country_data);
            self.worldChart.update(country_data);

        });
    });


    //Domain definition for global color scale
    // var domain = [-60,-50,-40,-30,-20,-10,0,10,20,30,40,50,60 ];
    //
    // //Color range for global color scale
    // var range = ["#0066CC", "#0080FF", "#3399FF", "#66B2FF", "#99ccff", "#CCE5FF", "#ffcccc", "#ff9999", "#ff6666", "#ff3333", "#FF0000", "#CC0000"];
    //
    // //Global colorScale to be used consistently by all the charts
    // self.colorScale = d3.scaleQuantile()
    //     .domain(domain).range(range);

    // self.colorScale = d3.scaleLinear()
    //     .range(["#cd6155", "#641e16"]);
        // .range(["yellow", "red", "darkred", "green"]);

    // ******* PART I *******

    //Style the chart by adding a dashed line that connects all these years.
    //HINT: Use .lineChart to style this dashed line

    // var pathData = [ { "x": 0,   "y": 50},  { "x": self.svgWidth,  "y": 50}];
    //
    // var pathFunction = d3.line()
    //     .x(function(d) { return d.x; })
    //     .y(function(d) { return d.y; });
    //
    // self.svg.append("path")
    //     .attr("d", pathFunction(pathData))
    //     .classed("lineChart", true);

    // var xScale = d3.scaleLinear()
    //     .domain([0, self.electionWinners.length])
    //     .range([self.margin.left + self.margin.right, self.svgBounds.width])
    //     .nice();

    // Create the chart by adding circle elements representing each election year
    //The circles should be colored based on the winning party for that year
    //HINT: Use the .yearChart class to style your circle elements
    //HINT: Use the chooseClass method to choose the color corresponding to the winning party.

    // var circles = self.svg.selectAll("circle").data(self.electionWinners);
    //
    // circles = circles.enter()
    //     .append("circle")
    //     .merge(circles);
    //
    // circles.attr("cx", function (d, i) {
    //     return xScale(i);
    // })
    //     .attr("cy", 50)
    //     .attr("r", 15)
    //     .attr("class", function(d) { return self.chooseClass(d.PARTY); })
    //     .classed("yearChart", true);


    //Append text information of each year right below the corresponding circle
    //HINT: Use .yeartext class to style your text elements

    // var text = self.svg.selectAll("text")
    //     .data(self.electionWinners)
    //     .enter()
    //     .append("text");
    //
    // var textLabels = text
    //     .attr("x", function (d, i) {
    //         return xScale(i);
    //     })
    //     .attr("y", 95)
    //     .text( function (d) { return d.YEAR; })
    //     .classed("yeartext", true);



    //Clicking on any specific year should highlight that circle and  update the rest of the visualizations
    //HINT: Use .highlighted class to style the highlighted circle

    // self.svg.selectAll("circle")
    //     .on("mouseover", function (d) {
    //         d3.select(this)
    //             .classed("highlighted", true);
    //     })
    //     .on("mouseout", function (d) {
    //         d3.select(this)
    //             .classed("highlighted", false);
    //     })
    //     .on("click", function (d) {
    //         d3.select("circle#selected")
    //             .classed("selected", false)
    //             .attr("id", null);
    //         d3.select(this)
    //             .attr("id", "selected")
    //             .classed("selected", true);

            //Election information corresponding to that year should be loaded and passed to
            // the update methods of other visualizations
            // d3.csv("data/Year_Timeline_" + d.YEAR + ".csv", function (error, electionResult) {
            //     electionResult.forEach(function(d) {
            //         d.Total_EV = parseInt(d.Total_EV);
            //         d.RD_Difference = parseFloat(d.RD_Difference);
            //         d.R_PopularPercentage = parseFloat(d.R_PopularPercentage);
            //         d.D_PopularPercentage = parseFloat(d.D_PopularPercentage);
            //         d.I_PopularPercentage = parseFloat(d.I_PopularPercentage);
            //
            //     });
            //     self.electoralVoteChart.update(electionResult, self.colorScale);
            //     self.votePercentageChart.update(electionResult, self.colorScale);
            //     self.worldChart.update(electionResult, self.colorScale);
            // });

};
