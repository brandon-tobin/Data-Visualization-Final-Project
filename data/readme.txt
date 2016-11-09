CountryDataByYear.csv
http://databank.worldbank.org/data/CO2-vs-SocialEconomic-Data/id/91326c1c
Go to the site to download or edit the dataset. This dataset includes all the countries and data by year


countries.csv is where to get the following data:
"Country code",
"Continent",
"Capital",
"Area",
"Coastline",
"Government form",
"Currency",





Here is code to get the data in to the form found in country_data.PNG

d3.csv("data/CountryDataByYear.csv", function (error, cData) {
    d3.csv("data/countries.csv", function (error, countries) {

        country_data = [];
        countries.forEach(function(c,i){
            _country = c;
            var cDataFiltered = cData.filter(function(d){return d["Country Name"] ==_country.Country;});

            options = [];

            cDataFiltered.forEach(function(d, i){
                var o ={};
                o.Name = d["Series Name"];
                o.Years = {};

                for(var i = 1990; i<= 2016; i++){
                    o.Years[i] = d[i + " [YR" + i + "]"];
                }
                options.push(o);
            });


            var cPack = {};
            cPack.Name = c["Country"];
            cPack.Code = c["Country code"];
            cPack.Info = c;
            cPack.Options = options;
            country_data.push(cPack);
        });


    });
});