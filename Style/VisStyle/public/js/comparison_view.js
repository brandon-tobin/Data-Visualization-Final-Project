/**
 * Created by mahowa on 11/29/2016.
 */
OptionEnum = {

    CO2_Total_kt: "CO2 emissions (kt)",
    CO2_per_capita: "CO2 emissions (metric tons per capita)",
    CO2_per_ppp_of_capita: "CO2 emissions (kg per PPP $ of GDP)",
    FuelTypes: {
        CO2_by_gaseousFuel: "CO2 emissions from gaseous fuel consumption (% of total)",
        CO2_by_liquidFuel: "CO2 emissions from liquid fuel consumption (% of total)",
        CO2_by_solidFuel: "CO2 emissions from solid fuel consumption (% of total)",

        Chart: {
            Title: "Fuel Consumption (% of country total)",
            CO2_by_gaseousFuel: "Gaseous",
            CO2_by_liquidFuel: "Liquid fuel",
            CO2_by_solidFuel: "Solid",
        }
    },

    CombustionFactors: {
        CO2_by_elec: "CO2 emissions from electricity and heat production, total (% of total fuel combustion)",
        CO2_by_manufacturing: "CO2 emissions from manufacturing industries and construction (% of total fuel combustion)",
        CO2_by_buildingsPublicServices: "CO2 emissions from residential buildings and commercial and public services (% of total fuel combustion)",
        CO2_by_otherSectors: "CO2 emissions from other sectors, excluding residential buildings and commercial and public services (% of total fuel combustion)",

        Chart: {
            Title: "Fuel Consumption by (% of country total)",
            CO2_by_elec: "Electricity and Heat",
            CO2_by_manufacturing: "Manufacturing/Construction",
            CO2_by_buildingsPublicServices: "Buildings/Public services",
            CO2_by_otherSectors: " Other Sectors",
        }
    },

    Population: "Population, total",

    SurfaceArea: "Surface area (sq. km)",

    GDP_Options: {
        GDP: "GDP (current US$)",
        GDP_Growth: "GDP growth (annual %)",
        GDP_per_capita: "GDP per capita (current US$)",
        CO2_GDP: "CO2 emissions (kg per PPP $ of GDP)",
    }
}

OptionEnumSimplified = {

    CO2_Total_kt: "CO2 emissions (kt)",
    CO2_per_capita: "CO2 emissions (metric tons per capita)",
    CO2_per_ppp_of_capita: "CO2 emissions (kg per PPP $ of GDP)",
    FuelTypes: {
        CO2_by_gaseousFuel: "Gaseous(%)",
        CO2_by_liquidFuel: "Liquid fuel(%)",
        CO2_by_solidFuel: "Solid(%)",
    },

    CombustionFactors: {
        CO2_by_elec: "Electricity and Heat(%)",
        CO2_by_manufacturing: "Manufacturing/Construction(%)",
        CO2_by_buildingsPublicServices: "Buildings/Public services(%)",
        CO2_by_otherSectors: " Other Sectors(%)",


    },

    Population: "Population, total",

    SurfaceArea: "Surface area (sq. km)",

    GDP_Options: {
        GDP: "GDP (current US$)",
        GDP_Growth: "GDP growth (annual %)",
        GDP_per_capita: "GDP per capita (current US$)",
        CO2_GDP: "CO2 emissions (kg per PPP $ of GDP)",
    }
}


//TODO
//<select class="selectpicker" data-live-search="true" data-actions-box="true multiple>
//<optgroup label="CO2 emissions">
//    <option value="1">CO2 emissions (kg per PPP $ of GDP)</option>
//    <option selected value="2">CO2 emissions (kt)</option>
//    <option value="3">CO2 emissions (metric tons per capita)</option>
//</optgroup>
//
//<optgroup label="Fuel Type">
//    <option value="5">CO2 emissions from gaseous fuel consumption (% of total)</option>
//<option value="6">CO2 emissions from liquid fuel consumption (% of total)</option>
//<option value="10">CO2 emissions from solid fuel consumption (% of total)</option>
//</optgroup>
//<optgroup label="Combustion Factors">
//    <option value="4">CO2 emissions from electricity and heat production, total (% of total fuel combustion)</option>
//<option value="7">CO2 emissions from manufacturing industries and construction (% of total fuel combustion)</option>
//<option value="8">CO2 emissions from other sectors, excluding residential buildings and commercial and public services (% of total fuel combustion)</option>
//<option value="9">CO2 emissions from residential buildings and commercial and public services (% of total fuel combustion)</option>
//</optgroup>
//<optgroup label="GDP Factors">
//    <option value="12">GDP (current US$)</option>
//<option value="13">GDP growth (annual %)</option>
//<option value="14">GDP per capita (current US$)</option>
//</optgroup>
//
//<optgroup label="Country Factors">
//    <option value="Population, total">Population, total</option>
//<option value="11">Surface area (sq. km)</option>
//</optgroup>
//</select>

$(document).ready(function () {
    $("#c_select").selectpicker('hide')
})

function createComparison() {
    var selected = $('#c_select').find(":selected");

    var countries = [];
    var colors = []
    global_selected.forEach(function (d, i) {
        countries.push(d.Name);
        colors[i] = getRandomColor();
    })

    var options = [OptionEnum.CO2_per_capita, OptionEnum.CO2_Total_kt,
        OptionEnum.FuelTypes.CO2_by_gaseousFuel, OptionEnum.FuelTypes.CO2_by_liquidFuel, OptionEnum.FuelTypes.CO2_by_solidFuel,
        OptionEnum.CombustionFactors.CO2_by_buildingsPublicServices, OptionEnum.CombustionFactors.CO2_by_elec,
        OptionEnum.CombustionFactors.CO2_by_manufacturing, OptionEnum.CombustionFactors.CO2_by_otherSectors,
        OptionEnum.GDP_Options.CO2_GDP, OptionEnum.GDP_Options.GDP, OptionEnum.GDP_Options.GDP_Growth, OptionEnum.GDP_Options.GDP_per_capita,
        OptionEnum.Population, OptionEnum.SurfaceArea];

    var remove = [];

    options = options.filter(function (o, i) {
        var found = false

        for (var j = 0; j < selected.length; j++) {
            var text = $(selected[j]).text()
            if (text === o) {
                found = true;
                break;
            }
        }
        if (!found)
            remove.push(i)
        return found;
    })

    var optionsSimp = [OptionEnumSimplified.CO2_per_capita, OptionEnumSimplified.CO2_Total_kt,
        OptionEnumSimplified.FuelTypes.CO2_by_gaseousFuel, OptionEnumSimplified.FuelTypes.CO2_by_liquidFuel, OptionEnumSimplified.FuelTypes.CO2_by_solidFuel,
        OptionEnumSimplified.CombustionFactors.CO2_by_buildingsPublicServices, OptionEnumSimplified.CombustionFactors.CO2_by_elec,
        OptionEnumSimplified.CombustionFactors.CO2_by_manufacturing, OptionEnumSimplified.CombustionFactors.CO2_by_otherSectors,
        OptionEnumSimplified.GDP_Options.CO2_GDP, OptionEnumSimplified.GDP_Options.GDP, OptionEnumSimplified.GDP_Options.GDP_Growth, OptionEnumSimplified.GDP_Options.GDP_per_capita,
        OptionEnumSimplified.Population, OptionEnumSimplified.SurfaceArea];

    optionsSimp = optionsSimp.filter(function (o, i) {
        return remove.indexOf(i) === -1
    })

    var m = [150, 160, 200, 160],
        w = 1280 - m[1] - m[3],
        h = 800 - m[0] - m[2];

    var x = d3.scaleBand()
            .domain(options)
            .range([0, w]),
        y = {};

    var line = d3.line(),
        axis = d3.axisLeft(),
        foreground;

    var svg = d3.select("#comparison").html("").append("svg:svg")
        .attr("width", w + m[1] + m[3])
        .attr("height", h + m[0] + m[2])
        .append("svg:g")
        .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

    //TODO start here
    // Create a scale and brush for each trait.
    //
    options.forEach(function (d) {
        // Coerce values to numbers.

        var optionMax = 0;
        var optionMin = 10000000000;
        global_selected.forEach(function (p) {
            var option = p.Data.Options.filter(function (o) {
                return o.Name === d;
            })
            option = option[0];


            var max = OptionMax(option.Years);
            var min = OptionMin(option.Years);

            if (optionMin > min)
                optionMin = min;

            if (optionMax < max)
                optionMax = max;

            y[d] = d3.scaleLinear()
                .domain([optionMin, optionMax])
                .range([h, 0]);

            y[d].brush = d3.brushY()
                .extent([[0, 0], [16, h]])
                .on("brush", brush);
        });


    });

    // Add a legend.
    var legend = svg.selectAll("g.legend")
        .data(countries)
        .enter().append("svg:g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            return "translate(0," + (i * 20 + 584) + ")";
        });

    legend.append("svg:line")
        .style("stroke", function (d, i) {
            return colors[i];
        })
        .attr("x2", 20)
        .style("stroke-width", "3px")


    legend.append("svg:text")
        .attr("x", 22)
        .attr("dy", ".31em")
        .text(function (d) {
            return d;
        });

    // Add foreground lines.
    foreground = svg.append("svg:g")
        .attr("class", "foreground")
        .selectAll("path")
        .data(global_selected)
        .enter().append("svg:path")
        .attr("d", path)
        .style("stroke", function (d, i) {
            return colors[i];
        });

    // Add a group element for each option.
    var g = svg.selectAll(".trait")
        .data(options)
        .enter().append("svg:g")
        .attr("class", "trait")
        .attr("transform", function (d) {
            return "translate(" + x(d) + ")";
        })
        .call(d3.drag()
            .subject(function (d) {
                return {x: x(d)};
            })
            .on("start", dragstart)
            .on("drag", drag)
            .on("end", dragend));

    // Add an axis and title.
    g.append("svg:g")
        .attr("class", "axis")
        .each(function (d) {
            d3.select(this).call(axis.scale(y[d])
                .tickFormat(d3.format(".0s")));
        })
        .append("svg:text")
        .attr("text-anchor", "end")
        .attr("y", 10)
        .text(function (d, i) {
            return optionsSimp[i];
        })
        .attr("fill", "black")
        .attr("transform", "rotate(25)")
        .attr("dy", "-1.5em")

    // Add a brush for each axis.
    g.append("svg:g")
        .attr("class", "brush")
        .each(function (d) {
            d3.select(this).call(y[d].brush);
        })
        .selectAll("rect")
        .attr("x", -8)
        .attr("width", 16);

    function dragstart(d) {
        i = options.indexOf(d);
    }

    function drag(d) {
        x.range()[i] = d3.event.x;
        options.sort(function (a, b) {
            return x(a) - x(b);
        });
        g.attr("transform", function (d) {
            return "translate(" + x(d) + ")";
        });
        foreground.attr("d", path);
    }

    function dragend(d) {
        x.domain(options).rangePoints([0, w]);
        var t = d3.transition().duration(500);
        t.selectAll(".trait").attr("transform", function (d) {
            return "translate(" + x(d) + ")";
        });
        t.selectAll(".foreground path").attr("d", path);
    }


    // Returns the path for a given data point.
    function path(d) {
        var val = line(options.map(function (p) {
            var option = d.Data.Options.filter(function (o) {
                return o.Name === p;
            })
            option = option[0];

            var years = YearArray(option.Years, selectedyear1, selectedyear2);
            var avg = d3.sum(years) / years.length;

            return [x(p), y[p](avg)];
        }));

        return val;
    }

    var brushedSelection = [];

    // Handles a brush event, toggling the display of foreground lines.
    function brush() {
        var select = d3.event.selection;
        var b = this;

        var brushPack = {};
        brushPack.Name = b.__data__;
        brushPack.Selection = d3.event.selection;

        brushedSelection = brushedSelection.filter(function (d) {
            return d.Name !== brushPack.Name;
        })

        brushedSelection.push(brushPack);


        foreground.attr("style", function (d, i) {
            var stl1 = "stroke:" + colors[i] + ";stroke-opacity:.2";
            var stl2 = "stroke:" + colors[i] + ";";
            var within = brushedSelection.every(function (p, i) {
                var option = d.Data.Options.filter(function (o) {
                    return o.Name === p.Name;
                })
                option = option[0];

                var years = YearArray(option.Years, selectedyear1, selectedyear2);
                var avg = d3.sum(years) / years.length;

                var point = y[p.Name](avg);

                return (p.Selection[0] <= point && point <= p.Selection[1]);
            })

            return within ? stl2 : stl1;
        });
    }

    function YearArray(Years, start_year, end_year) {
        var yearArr = [];

        if (Array.isArray(Years))
            return Years;

        //Put years object into an array
        for (var i = 0; i < years.length; i++) {

            //Only grab years within our bounds
            if (years[i] >= start_year && end_year >= years[i])
                yearArr[i] = Years[years[i]];
        }

        yearArr = yearArr.filter(function (dd) {
            return dd !== "" && dd != "..";
        });

        return yearArr;
    }

    function OptionMax(option) {
        option = YearArray(option, selectedyear1, selectedyear2);
        var max = d3.max(option, function (d) {
            return parseFloat(d);
        });
        return max;
    }

    function OptionMin(option) {
        option = YearArray(option, selectedyear1, selectedyear2);
        var min = d3.min(option, function (d) {
            return parseFloat(d);
        });
        return min;
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}

