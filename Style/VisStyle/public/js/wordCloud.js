var _WordCloud;
var country_data;
function WordCloud(worldChart) {
    var self = this;
    _WordCloud = this;
    self.worldChart = worldChart;

    self.init();
};

/**
 * Initializes the svg elements required for this chart
 */
WordCloud.prototype.init = function () {
    createYear();
};

/**
 * Creates a chart with circles representing each election year, populates text content and other required elements for the Year Chart
 */
WordCloud.prototype.setGlobal = function (update) {
    var self = this;
    d3.csv("data/CountryDataByYear.csv", function (error, cData) {
        d3.csv("data/countries.csv", function (error, countries) {

            //TODO add population/surfaceArea Option

            country_data = [];
            countries.forEach(function (c, i) {
                var _country = c;
                var cDataFiltered = cData.filter(function (d) {
                    return d["Country Name"] == _country.Country;
                });

                if (cDataFiltered.length != 0) {

                    var options = [];

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
            if (update)
                self.worldChart.update(country_data);
        });
    });

}

WordCloud.prototype.update = function () {
    this.setGlobal(true);
};
