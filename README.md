Process Book: Climate Change players

Prepared for: Data Visualization

By: Brandon Tobin, Matt Howa, Matt Willden

Website: https://willdenms.github.io/dataviscourse-pr-climate_change_players/

Code: https://github.com/willdenms/dataviscourse-pr-climate_change_players

December 2, 2016

Overview & motivation

**Overview**

Climate Change Players is more than a simple visualization, it combines a massive datable of socioeconomic data for nearly every major country in the world. It allows its viewers to see correlations between these socioeconomic properties and the countries producing them. What country produces the most greenhouse gasses?, Is there a relation between land mass and emission output?, How does this data change year to year? These are only a few of endless questions which this graphic can help to answer.

**Motivation / Related Work**

With all the debate going on with the subject of climate change, we ended up with the question: “Even if we pass green policies in our nation (USA) will it have an effect when compared to what other countries put out?” This question motivated us to really look into what data was available, and we quickly realized that there is a massive amount of data, but we couldn’t find any visualization that let you investigate and answer questions about which countries contributed to emissions. The ones we did find, show basic stats, but didn’t really answer out question, the data was either abstracted away, or were just reusing old nasa video. We realized that with the plentiful data available we could take our visualization further; letting the user make their own decisions. Another thing that we wanted to do with the visualization is present the page in a such a way that was professional and as unbiased as possible as the same time trying to be engaging.

**The Question**

The aim of this project, amongst other things, is to show correlations between countries and a wide arrange of known emissions data for those countries as well as other socioeconomic data for countries, such as GDP, land size, coast size etc.. The hope of these data series, is that specific questions about climate change can be answered. The intent is not to disprove or prove climate change, but to let the user decide how to interpret the data through of who is contributing to world wide emissions. After finding large amounts of data, but not finding a visualization which gave the user a way to compare data between countries, we decided that we could take the data which is more than plentiful and answer the question ourselves.

**Problems - Milestone**

We were able to find data, but there was a lot of data merging that had to be done. One problem we faced right away was trying to find a base year to go with. We knew from the beginning that we wanted a time element in our  visualization, so it could show how countries emissions changed year to year. The problem was that data wasn’t available at the same time period and we wanted to present the data in most consistent way possible, finally we found a database that had data going back to 1990. We then created a few other tables to help parse this data.

Another problem, though not as big as the first was with the word cloud. We wanted the word cloud data to be unique from the usual array of “array of words and their size”. We thought it would be interesting to correlate the word  frequency based how much that word had been searched. Then when a country was selected it would change the cloud to show data corresponding to how much that country had searched for words. This presented many challenges, not only in data acquisition, but also in the fact the domain of countries that were represented by google trends was incredibly small. Further, we realized that between clicks the random nature of the word cloud would make it hard to draw any actual vague conclusion from anyway, so we decided to find the total searches for a large array of words display that instead. This put the word cloud somewhat behind our schedule. 

The third problem we found was with how heat map. The heat map came together nicely, however finding a mapping of colors that allow a user to quickly and more importantly accurately, see the how each country’s emission stacks up is challenging. We have tried mapping multiple colors and scales of one color and combinations of the 2, however, it still seems to come up short. We are looking into more techniques to understand how we can better solve this problem. Fortunately our tool tip for displaying detail of a country’s data is coming along nicely and will help this problem.

**Problems - Final**

After our milestone, we ran into more problems with word cloud, we found that generating world clouds in d3 is not a trivial task, we ended up using a layout library provided by Jason Davis (d3-cloud), however it wasn’t in version 4 of d3 which is what the rest of our project was based on. We ended up wasting a lot of time trying to port this over. Ultimately we found it to be more practical to use a iframe to house the visualization. Another task that we found to be rather difficult was how we were displaying the map, it was taking up a large amount of the screen and we wanted to find a better way to do this.

Initial PROJECT Proposal 

**Overview**

Our initial project consisted of 3 main moving parts: a word cloud formed from the search trends for countries. A heat map which displayed an overview of all countries specific emission output. Finally the last major part was a tool-tip which interacted with the heat map to provide detail of that country’s emissions. 

Of course there are many more little parts that will be incorporated as well, these include a looping animation button that will let the heat map cycle through the years so that the user can see how it changes over the 26 year data period. Brushing so that a user can see more fine grain details of a country’s specific output by county/region. Finally making sure all of the graphs were interconnected so that a change in one would update everywhere else.

Project Revisal, Milestone 

**Data**

The data for the heat map contains every major country, and for most countries, it also contains their underlying region as well. For each country entry there is a breakdown of several type of different emissions as well as socioeconomic data such as land size, GDP, population etc… For this project thus far, we have not been able to determine if brushing into the country regions is a viable option, simply because not every country has these data points. Moreover, we do not have the geographic data plots to actually paint these. This could prove an insurmountable task.

**Tasks**

The main tasks were:

- Finding the Actual Data: this was a large task and took some time, though as previously mentioned, a database which allows for excellent data gathering was found, and with a little fiddling it is possible to generate dataset very quickly. Though it was not necessarily trivial to write the data model. It required planning for the future in how to incorporate all of the moving parts, with not knowing the exact implementation. Ultimately this meant writing helper code to help with accessing the data.
- Creating a Heat Map: Once the data and data model was establish the heat map did come together. We wrote it in such a way to help incorporate the tooltip later. When a country is clicked it prints that country’s info to the console. We hope this will make integration of the tool tip easier. The Heat Map did take several iterations to figure out a color scheme, something we are still working on:

As can be seen, we tried several different color schemes, we found the last one to be the best, but still would like to investigate what color options could help represent the data better, and more accurately.

 

- Word Cloud: This also proved to be more of a challenge than expected, the main problem was trying to figure out how to actually map the data to the word cloud. More specific, we realized that our interconnectivity of clicking on a country and having that country’s search trends for climate change topics was limited to only a few countries. This took time out of the development schedule, but we were able to still create what we think is a good visualization.

- Finally there are 3 tasks that remain: implementation of a comparison chart, tooltips, brushing, and animations.  Our schedule is ahead on tooltips and comparison charts. The main idea here is upon clicking on a country the user will have the ability to interact further with the data. The illustration below would be an example of clicking on a country where a tool tip /  comparison chart would be populated. Here we see that the 2 graphs show types of emissions compared against 3 socioeconomic properties.

**Users**

In our vision, the target audience would be something of a New York Times / online newspaper reader. One where the author would want to show as little bias as possible to tell his narrative. The user would then be able to form their own opinions. It isn’t meant to be a stance piece for or against, simple an informative visualization which can help a person who has an average understanding of climate change problems and general economic theories, answer their own questions.

Final Project

  

**  **

**Data**

From this point, the data was pretty much in place. We did find more data for CO2 emissions which allowed our visualization to have an even greater amount of data to choose from. Another change was how we were gathering data for the word cloud. We also changed the data for the word cloud. The original was to have the data come from google trends, then for each country what was selected on the map, the cloud would change to reflect the search preferences for that country. There were 2 problems with this, first, there aren’t enough data set to match the map, so it was hard to populate the data consistently. Secondly, we found that it wasn’t really contributing to the visualization, so instead of populating data sets for each country, we summed up the data and that is what we finally used

**Exploratory Data Analysis**

From our previous version the biggest change was how finally incorporating the tool-tip and the comparison chart with the main visualization. The biggest change was to how our comparison chart worked, we realized that a bar chart might not be the most effective way to show the data. We swapped it for a parallel coordinates chart, which quickly showed how multiple countries compare in each category. The big reason for this change was that we realized that what we really wanted to show was to show how to data categories related to each other. Switch the map for a globe view accompanied with a tool-tip that gave a quick break down of the basic stats for the current country made it much easier to access and evaluate country data before adding it to the comparison chart.

Finally what we really thought brings everything together was that we used the same color cue to help the user quickly understand what was a lot and what was not a lot. This was important as the data categories change. Ultimately this coloring which we used for the choropeth globe, was used for the tool tips, and the word cloud to give the presentation of data a seamless feel.

**Design Evolution / Final Implementation**

From the last point to this, there were many changes, followed obviously by the actual integration of all the visualization together, in a concise format. There were 4 main changes which occurred, the afore mentioned change in the word cloud presentation, the choropeth map to a choropeth globe view, the bar charts for comparison charts to a parallel coordinates chart, and finally the inclusion of a year brusher to select multiple years for the data.  These changes are shown below:

**Word Cloud Evolution**

We  originally had a black white word cloud, we changed the color scheme to match the choropeth globe like the rest of the data. We changed the way that the cloud overlapped with itself along with fonts, we had always thought of the word cloud to be the attention getter, for the splash screen. After all that’s what word clouds are for, they aren’t very good at showing actual data, so we added a picture to finalize the splash screen. Then finally we added animatio      

**Map to Globe**

As can be easily seen from the revisions, this was something that we reworked a lot, in the final image, you can see the integration of the tool tip, year brush and legend and gridlines, what you cannot see is that we incorporated a zoom feature:      

**Parallel Coordinates**

For showing how to compare different countries on the fly and through a more refined comparison chart, we evolved from using a bar chart exclusively to a parallel coordinate system for comparing fine details for multiple countries at once, while maintaining a bar chart system for quickly displaying map data. Once we settled on the parallel coordinate chart, the biggest part was controlling how we selected data and styling As can be seen in the last image, there is a interactive select box, as well as a pane showing what countries are in the comparison chart.     

**Year Selection**

This was a smaller change, but it helped a lot to pull the graph together, another incorporation that helped was the input of a play / pause button, this allows the globe to spin. The first image shows the original way we selected years, the final shows the brushing chart, as well as the play /  pause buttons  

Conclusion

In the end our visualization was able to answer the question which spawned our motivation, does restricting the emissions in the USA really effect the world: IT DOES!!  When compared to other countries, the USA puts out a very large amount of emissions, especially CO2 emissions. We learned that there exists many correlations between emissions and the GDP and land mass of a population, but not in every situation. For example, in nations that have many green policies in place, like Scandinavia, they have a large GDP per capita, yet their total emission remains low. To take this visualization further, we’d like to further break down the data and perhaps add a few more interactive graphs, we learned a lot about how to implement different types of data visualization systems, but in the end it was hard to have time to implement them all. We think that this visualization can help answer a lot of questions, but what is perhaps more encouraging is that it help us ask more questions that we couldn’t have known to ask before.
