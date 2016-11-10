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



//Here is an enum that should help access the options easier
var OptionEnum = {
            CO2_GDP : "CO2 emissions (kg per PPP $ of GDP)",
            CO2_Total_kt : "CO2 emissions (kt)",
            CO2_per_capita : "CO2 emissions (metric tons per capita)",
            CO2_by_electricityHeat : "CO2 emissions from electricity and heat production, total (% of total fuel combustion)",
            CO2_by_gaseousFuel : "CO2 emissions from gaseous fuel consumption (% of total)",
            CO2_by_liquidFuel : "CO2 emissions from liquid fuel consumption (% of total)",
            CO2_by_manufacturing : "CO2 emissions from manufacturing industries and construction (% of total fuel combustion)",
            CO2_by_buildingsPublicServices : "CO2 emissions from other sectors, excluding residential buildings and commercial and public services (% of total fuel combustion)",
            CO2_by_solidFuel : "CO2 emissions from solid fuel consumption (% of total)",


            Population : "Population, total",
            SurfaceArea : "Surface area (sq. km)",
            GDP : "GDP (current US$)",
            GDP_Growth : "GDP growth (annual %)",
            GDP_per_capita : "GDP per capita (current US$)"
        }
