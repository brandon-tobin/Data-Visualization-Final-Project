/**
 * Created by mahowa on 11/27/2016.
 */
OptionEnum = {

    CO2_Total_kt : "CO2 emissions (kt)",
    CO2_per_capita : "CO2 emissions (metric tons per capita)",

    FuelTypes : {
        CO2_by_gaseousFuel: "CO2 emissions from gaseous fuel consumption (% of total)",
        CO2_by_liquidFuel: "CO2 emissions from liquid fuel consumption (% of total)",
        CO2_by_solidFuel: "CO2 emissions from solid fuel consumption (% of total)",

        Chart: {
            Title:"Fuel Consumption (% of country total)",
            CO2_by_gaseousFuel: "Gaseous",
            CO2_by_liquidFuel: "Liquid fuel",
            CO2_by_solidFuel: "Solid",
        }
    },

    CombustionFactors : {
        CO2_by_elec: "CO2 emissions from electricity and heat production, total (% of total fuel combustion)",
        CO2_by_manufacturing: "CO2 emissions from manufacturing industries and construction (% of total fuel combustion)",
        CO2_by_buildingsPublicServices: "CO2 emissions from residential buildings and commercial and public services (% of total fuel combustion)",
        CO2_by_otherSectors : "CO2 emissions from other sectors, excluding residential buildings and commercial and public services (% of total fuel combustion)",

        Chart:{
            Title:"Fuel Consumption by (% of country total)",
            CO2_by_elec: "Electricity and Heat",
            CO2_by_manufacturing: "Manufacturing and Construction",
            CO2_by_buildingsPublicServices: "Buildings and Public services",
            CO2_by_otherSectors : " Other Sectors",
        }
    },

    Population : "Population, total",

    SurfaceArea : "Surface area (sq. km)",

    GDP_Options : {
        GDP: "GDP (current US$)",
        GDP_Growth: "GDP growth (annual %)",
        GDP_per_capita: "GDP per capita (current US$)",
        CO2_GDP: "CO2 emissions (kg per PPP $ of GDP)",
    }
}
years = [1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016];

function setGlobal(){
    d3.csv("data/CountryDataByYear.csv", function (error, cData) {
        d3.csv("data/countries.csv", function (error, countries) {

            country_data = [];
            countries.forEach(function(c,i){
                _country = c;
                var cDataFiltered = cData.filter(function(d){return d["Country Name"] ==_country.Country;});

                if(cDataFiltered.length != 0) {

                    options = [];

                    cDataFiltered.forEach(function (d, i) {
                        var o = {};
                        o.Name = d["Series Name"];
                        o.Years = {};

                        for (var i = 1990; i <= 2016; i++) {
                            o.Years[i] = d[i + " [YR" + i + "]"];
                        }
                        options.push(o);
                    });


                    var cPack = {};
                    cPack.Name = c["Country"];
                    cPack.Code = cDataFiltered[0]["Country Code"];
                    cPack.Info = c;
                    cPack.Options = options;
                    country_data.push(cPack);
                }
            });


        });
    });
}

function YearArray(Years,start_year,end_year){
    var yearArr = [];

    //Put years object into an array
    for(var i = 0; i< years.length; i++){

        //Only grab years within our bounds
        if(years[i] >= start_year && end_year >=years[i])
            yearArr[i] = Years[years[i]];
    }

    yearArr = yearArr.filter(function(dd){
        return dd !== ""; });

    return yearArr;
}

function OptionMax(option,start_year,end_year){

    var max = d3.max(option,function(d) {
        return d3.max(d.Years, function (y) {
            return parseFloat(y);
        });
    });
    return max;
}


function map_tooltip(country_code, start_year, end_year){
    var svgWidth = 350;
    var svgHeight = 150;
    var xAxis = 120;
    var yAxis = 40;

    var ColorScale = d3.scaleLinear()
        .range(['#9e9798', '#a0030d'])
        .domain([0,50])

    var country = country_data.filter(function(d) {return d.Code.toLowerCase() === country_code.toLowerCase();})[0];
    var options = country.Options;

    var FuelTypes = OptionEnum.FuelTypes;
    var CombustionFactors = OptionEnum.CombustionFactors;

    var FuelTypeOptions =options.filter(function(d){
        return d.Name === FuelTypes.CO2_by_gaseousFuel ||
            d.Name === FuelTypes.CO2_by_liquidFuel ||
            d.Name === FuelTypes.CO2_by_solidFuel;
    });
    FuelTypeOptions = FuelTypeOptions.filter(function(d){
        //Clean up data
        if(Array.isArray(d.Years))
            return true;
        d.Years = YearArray(d.Years,start_year,end_year);
        return true;
    });
    var CombustionFactorOptions = options.filter(function(d){
        return  d.Name === CombustionFactors.CO2_by_buildingsPublicServices ||
            d.Name === CombustionFactors.CO2_by_elec ||
            d.Name === CombustionFactors.CO2_by_manufacturing ||
            d.Name === CombustionFactors.CO2_by_otherSectors
    });

    CombustionFactorOptions = CombustionFactorOptions.filter(function(d){
        //Clean up data
        if(Array.isArray(d.Years))
            return true;
        d.Years = YearArray(d.Years,start_year,end_year);
        return true;
    });

    var xScale  = d3.scaleLinear()
        .range([0,svgWidth - xAxis -2])
        .domain([0,50]);


    //Chart Elements
    var FuelTypesChart = d3.select("#FuelTypes");
    var CombustionFactorsChart = d3.select("#CombustionFactors");

    //Creates SVG Element within the DIV
    var FuelTypesSVG = FuelTypesChart.append("svg")
        .attr("width",svgWidth)
        .attr("height",svgHeight)

    var CombustionFactorsSVG = CombustionFactorsChart.append("svg")
        .attr("width",svgWidth)
        .attr("height",svgHeight)


    //Create Axis
    var xAxisFuelTypes = d3.axisBottom()
        .tickFormat(d3.format(".0f"));
    xAxisFuelTypes.scale(xScale);

    var xAxisCombustionFactors = d3.axisBottom()
        .tickFormat(d3.format(".0f"));
    xAxisCombustionFactors.scale(xScale);

    CombustionFactorsSVG.append("g")
        .attr("transform", "translate(" + xAxis + "," + (svgHeight - yAxis + 15) + ")")
        .call(xAxisCombustionFactors)
        .attr("class", "xAxis")
        .selectAll("text")
        .style("text-anchor","end")
        .attr("dx","-1.2em")
        .attr("dy","-.5em")
        .attr("transform","rotate(-55)")
        .style("font-size", "8px")

    FuelTypesSVG.append("g")
        .attr("transform", "translate(" + xAxis + "," + (svgHeight - yAxis + 15) + ")")
        .call(xAxisFuelTypes)
        .attr("class", "xAxis")
        .selectAll("text")
        .style("text-anchor","end")
        .attr("dx","-1.2em")
        .attr("dy","-.5em")
        .attr("transform","rotate(-55)")
        .style("font-size", "8px")

    //Build CHARTS
    FuelTypesSVG.selectAll("rect")
        .data(FuelTypeOptions)
        .enter()
        .append("rect")
        .attr("transform", "translate(" + 0 + "," + (15) + ")")
        .attr("height",function(){return (svgHeight-yAxis-5)/FuelTypeOptions.length;})
        .attr("width",function(d){
            return xScale(d3.sum(d.Years)/ d.Years.length);})
        .attr("x",xAxis)
        .attr("y",function(d,i){return (svgHeight-yAxis-5)/FuelTypeOptions.length*i;})
        .attr("class",function(d,i){
            if(i%2==0) return "bar";
            return "bar";
        })
        .style("fill", function(d){return ColorScale(d3.sum(d.Years)/ d.Years.length)})
        .selectAll("text")
        .data(function(d){return d;})

    FuelTypesSVG.append("g")
        .selectAll("text")
        .data(FuelTypeOptions)
        .enter()
        .append("text")
        .attr("x", xAxis -5)
        .attr("y", function(d,i){return (svgHeight-yAxis)/FuelTypeOptions.length*(i+1);})
        .attr("text-anchor", "end")
        .text(function(d) {
            switch (d.Name){
                case OptionEnum.FuelTypes.CO2_by_gaseousFuel:
                    return OptionEnum.FuelTypes.Chart.CO2_by_gaseousFuel;
                case OptionEnum.FuelTypes.CO2_by_liquidFuel:
                    return OptionEnum.FuelTypes.Chart.CO2_by_liquidFuel;
                case OptionEnum.FuelTypes.CO2_by_solidFuel:
                    return OptionEnum.FuelTypes.Chart.CO2_by_solidFuel;
            }

        })
        .attr("fill", "black")
        .style("font-size", "7px")
        .style("font-weight","700")

    FuelTypesSVG.append("text")
        .attr("x", (svgWidth / 2))
        .attr("y", 10)
        .attr("text-anchor", "middle")
        .style("font-size", "11px")
        .style("text-decoration", "underline")
        .style("font-weight", "bold")
        .text(OptionEnum.FuelTypes.Chart.Title);



    CombustionFactorsSVG.selectAll("rect")
        .data(CombustionFactorOptions)
        .enter()
        .append("rect")
        .attr("transform", "translate(" + 0 + "," + (15) + ")")
        .attr("height",function(){return (svgHeight-yAxis-5)/CombustionFactorOptions.length;})
        .attr("width",function(d){return xScale(d3.sum(d.Years)/ d.Years.length);})
        .attr("x",xAxis)
        .attr("y",function(d,i){return (svgHeight-yAxis-5)/CombustionFactorOptions.length*i;})
        .attr("class",function(d,i){
            if(i%2==0)return "bar";
            return "bar";
        })
        .style("fill", function(d){return ColorScale(d3.sum(d.Years)/ d.Years.length)})

    CombustionFactorsSVG.append("g")
        .selectAll("text")
        .data(CombustionFactorOptions)
        .enter()
        .append("text")
        .attr("x", xAxis -5)
        .attr("y", function(d,i){return (svgHeight-yAxis + 5 )/CombustionFactorOptions.length*(i+1);})
        .attr("text-anchor", "end")
        .text(function(d) {
            switch (d.Name){
                case OptionEnum.CombustionFactors.CO2_by_elec:
                    return OptionEnum.CombustionFactors.Chart.CO2_by_elec;
                case OptionEnum.CombustionFactors.CO2_by_buildingsPublicServices:
                    return OptionEnum.CombustionFactors.Chart.CO2_by_buildingsPublicServices;
                case OptionEnum.CombustionFactors.CO2_by_manufacturing:
                    return OptionEnum.CombustionFactors.Chart.CO2_by_manufacturing;
                case OptionEnum.CombustionFactors.CO2_by_otherSectors:
                    return OptionEnum.CombustionFactors.Chart.CO2_by_otherSectors;
            }
        })
        .attr("fill", "black")
        .style("font-size", "7px")
        .style("font-weight","700")

    CombustionFactorsSVG.append("text")
        .attr("x", (svgWidth / 2))
        .attr("y", 10)
        .attr("text-anchor", "middle")
        .style("font-size", "11px")
        .style("font-weight", "bold")
        .style("text-decoration", "underline")
        .text(OptionEnum.CombustionFactors.Chart.Title);

}




$( document ).ready(function() {
    setGlobal();
});