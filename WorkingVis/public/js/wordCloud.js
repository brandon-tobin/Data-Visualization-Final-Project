
var _WordCloud;
var country_data;
function WordCloud(worldChart) {
    var self = this;
    _WordCloud = this;
    self.worldChart = worldChart;

    self.init();
}

/**
 * Calls the method to create the years
 */
WordCloud.prototype.init = function(){

    createYear();
};

/**
 * Reads in the data for our visualization and calls the function to draw the main visualization.
 */
WordCloud.prototype.setGlobal =function (update){
    var self = this;
    d3.csv("data/CountryDataByYear.csv", function (error, cData) {
        d3.csv("data/countries.csv", function (error, countries) {

            country_data = [];
            countries.forEach(function(c){
                var _country = c;
                var cDataFiltered = cData.filter(function(d){return d["Country Name"] ==_country.Country;});

                if(cDataFiltered.length != 0) {

                    var options = [];

                    cDataFiltered.forEach(function (d) {
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
            if(update)
                self.worldChart.update(country_data);
        });
    });

};

WordCloud.prototype.update = function(){

    this.setGlobal(true);
};
