<p align="center">
    <strong> </strong>
</p>
<p align="center">
    <strong>Project Proposal - Visualization</strong>
</p>
<p>
    <strong>Basic Info.</strong>
</p>
<p>
    <em>By</em>
    <strong>:</strong>
    <strong>Matt Howa</strong>
    : U0805396, matt.j.howa@gmail.com
</p>
<p>
    <strong>Matt Wilden</strong>
    : U0920335, willdenms@gmail.com
</p>
<p>
    <strong>Brandon Tobin</strong>
    : U0820304, brandontobin@cox.net
</p>
<p>
    <em>GitHub</em>
    : <a href="https://github.com/willdenms/dataviscourse-pr-climate_change_players">https://github.com/willdenms/dataviscourse-pr-climate_change_players</a>
</p>
<p>
    <strong>Background and Motivation.</strong>
</p>
<p>
    <em>Background</em>
    : Computer science students who want to live on the earth a few more years.
</p>
<p>
    <em>Motivation</em>
    : We were interested to see how socioeconomic properties of nations, such as population, GDP, policies, etc… correlate to climate change. Further, we
    wanted to see if these correlations could show how different nations contribute to climate change.
</p>
<p>
    <strong>Project Objectives.</strong>
</p>
<p>
    1. What countries produce the most emissions?
</p>
<p>
    2. How Population affects climate change?
</p>
<p>
    3. How Physical attributes of a country plays a role in climate change?
</p>
<p>
    4. How economic growth plays a role in climate change?
</p>
<p>
    a. GDP? Infrastructure?
</p>
<p>
    5. Who Cares about climate change
</p>
<p>
    a. Can these people do anything about it
</p>
<p>
    6. How all of these change over the years?
</p>
<ul type="disc">
    <li>
        <strong>Data</strong>
    </li>
</ul>
<p>
    o <a href="http://climate.nasa.gov/"><strong>http://climate.nasa.gov/</strong></a><strong></strong>
</p>
<p>
    o
    <a href="http://data.worldbank.org/indicator/EN.ATM.CO2E.PC?end=2013&amp;start=1960&amp;view=map">
        <strong>http://data.worldbank.org/indicator/EN.ATM.CO2E.PC?end=2013&amp;start=1960&amp;view=map</strong>
    </a>
    <strong></strong>
</p>
<p>
    o
    <a href="https://en.wikipedia.org/wiki/List_of_countries_by_carbon_dioxide_emissions_per_capita#Annual_carbon_dioxide_emissions_.5Btonnes.5D_per_capita">
        <strong>
            https://en.wikipedia.org/wiki/List_of_countries_by_carbon_dioxide_emissions_per_capita#Annual_carbon_dioxide_emissions_.5Btonnes.5D_per_capita
        </strong>
    </a>
    <strong></strong>
</p>
<p>
    o
    <a href="http://data.un.org/Data.aspx?d=WDI&amp;f=Indicator_Code%3AEN.ATM.CO2E.PC">
        <strong>http://data.un.org/Data.aspx?d=WDI&amp;f=Indicator_Code%3AEN.ATM.CO2E.PC</strong>
    </a>
    <strong></strong>
</p>
<p>
    o <strong>*** </strong><a href="http://data.un.org/Explorer.aspx?d=GHG"><strong>http://data.un.org/Explorer.aspx?d=GHG</strong></a><strong> ***</strong>
</p>
<p>
    o <a href="http://data.un.org/Default.aspx"><strong>http://data.un.org/Default.aspx</strong></a><strong> </strong>
</p>
<p>
    o <a href="http://data.okfn.org/data/core/country-list"><strong>http://data.okfn.org/data/core/country-list</strong></a><strong></strong>
</p>
<p>
    o <a href="https://www.worlddata.info/downloads/"><strong>https://www.worlddata.info/downloads/</strong></a><strong> </strong>
</p>
<p>
    o <a href="https://www.google.com/trends/"><strong>https://www.google.com/trends/</strong></a><strong> </strong>
</p>
<p>
    o <a href="http://cait.wri.org"><strong>http://cait.wri.org</strong></a><strong></strong>
</p>
<p>
    o <strong>http://data.worldbank.org</strong>
</p>
<p>
    <strong>Data Processing.</strong>
</p>
<p>
    <em><u>Cleanup</u></em>
    : The data we are pulling from will be clean however we expect to do a substantial amount of data manipulation for inter connectivity between
    visualizations.
</p>
<p>
    <em><u>Quantities</u></em>
    : Search usage, standard country data (pop., size, etc..), Emissions by country and year, economics by country and year.
</p>
<p>
    <em><u>Implementation</u></em>
    : We will implement using csv data and d3.
</p>
<ul type="disc">
    <li>
        <strong>Visualization Design</strong>
    </li>
</ul>
<strong>
    <br clear="all"/>
</strong>
<p>
    <strong> </strong>
</p>
<p align="center">
    <img src="file:///C:/Users/mahowa/AppData/Local/Temp/msohtmlclip1/01/clip_image002.jpg" alt="../idea.jpg" width="689" align="left" hspace="12" height="368"/>
    <img
        src="file:///C:/Users/mahowa/AppData/Local/Temp/msohtmlclip1/01/clip_image004.jpg"
        alt="../ideas_0.JPG"
        width="691"
        align="left"
        hspace="12"
        height="337"
    />
    <strong><u>(Sheet 1) Brainstorm</u></strong>
</p>
<p>
    · The main point of these boards, was to see what datasets would be interesting and how we could potentially visualize them.
</p>
<p align="center">
    <img
        src="file:///C:/Users/mahowa/AppData/Local/Temp/msohtmlclip1/01/clip_image006.jpg"
        alt="../design1.JPG"
        width="759"
        align="left"
        hspace="12"
        height="392"
    />
    <strong><u>(Sheet 2) Design 1</u></strong>
</p>
<p>
    · The basic idea here is that we wanted it to be eye catching and immersive
</p>
<p>
    · We did this first through a word cloud that was made up of different keywords that relate to climate change. The size of the word, would be determined by
    how often it was searched by region (google trends)
</p>
<p>
    · The second visualization is a heat map showing emissions output by geographical region. Then, brushing by years, the user would then be able to see the
    average emissions output. Selecting a country provides a tool tip with more specific data
</p>
<br clear="all"/>
<p align="center">
    <img
        src="file:///C:/Users/mahowa/AppData/Local/Temp/msohtmlclip1/01/clip_image008.jpg"
        alt="../idea2.JPG"
        width="748"
        align="left"
        hspace="12"
        height="362"
    />
    <strong><u>(Sheet 3) Design 2</u></strong>
</p>
<p>
    · This designs big feature was changing the map to a cartogram. It would change the size of the geographic area to be the size of their emissions output.
</p>
<p>
    · The filer was also changed to a drop down, instead of a brush type selection
</p>
<p>
    · Finally we went back to an early way of displaying search trends for climate change topics.
</p>
<br clear="all"/>
<p align="center">
    <img
        src="file:///C:/Users/mahowa/AppData/Local/Temp/msohtmlclip1/01/clip_image010.jpg"
        alt="../idea3.JPG"
        width="741"
        align="left"
        hspace="12"
        height="393"
    />
    <strong><u>(Sheet 4) Design 3</u></strong>
</p>
<p>
    · This design focused on comparing data sets, specifically between the emissions and the the socioeconomic property that could both be filtered for more
    detail with a drop down. Clicking on year would give a new window below the graphs which showed the selected data in more detail.
</p>
<p align="center">
    <img
        src="file:///C:/Users/mahowa/AppData/Local/Temp/msohtmlclip1/01/clip_image012.jpg"
        alt="../final.JPG"
        width="781"
        align="left"
        hspace="12"
        height="420"
    />
    <strong><u>(Sheet 5) Realization Design</u></strong>
</p>
<p>
    · Our choice was a mix of design 1 and design 3. We really liked how the heat map could give a quick overview to the user of how emissions were being used.
    However, design 1 lacked a way to compare datasets efficiently. We did this by letting the user select data and add it to a graph for more detail. The
    problem with design 3 was that the user started out with too much data and it was instantly cluttered, this way the user can select the data they want and
    it will make more sense to them.
</p>
<br clear="all"/>
<ul type="disc">
    <li>
        <strong>Must-Have Features.</strong>
        List the features without which you would consider your project to be a failure.
    </li>
</ul>
<p>
    1. Word Cloud
</p>
<p>
    2. Graph Emissions: By Year and country
</p>
<p>
    3. Graph Population: By Year and country
</p>
<p>
    4. Full inter connectivity between graphics
</p>
<ul type="disc">
    <li>
        <strong>Optional Features.</strong>
        List the features which you consider to be nice to have, but not critical.
    </li>
</ul>
<p>
    1. Animation, brushing to zoom by country
</p>
<ul type="disc">
    <li>
        <strong>Project Schedule.</strong>
        Make sure that you plan your work so that you can avoid a big rush right before the final project deadline, and delegate different modules and
        responsibilities among your team members. Write this in terms of weekly deadlines.
    </li>
    <ul type="circle">
        <li>
            Friday Nov 4<sup>th</sup>: Word Cloud
        </li>
        <li>
            Friday Nov 11<sup>th</sup>: Heat Map – Milestone Due
        </li>
        <li>
            Friday Nov 18<sup>th</sup>: Comparison Chart
        </li>
        <li>
            Wednesday Nov 30<sup>th</sup>: Tooltips, brushing, animations
        </li>
        <li>
            Tuesday Dec 1<sup>st</sup>: Finalize Visualization
        </li>
    </ul>
</ul>
