
var radius = 30, padding = 4, cols = 13;
var allPlayerData, playerData, yearMatchData;
var currentYear;
var playerPos = {};

//All_Players.json

d3.json('All_Players.json', function(err, data) {
    allPlayerData = data;
    console.log(allPlayerData)

});


function loadYearData(year){

    year = year.toString();

    var playerDataFile = 'Year_'+year + '_Players.json';

    var yearDataFile = 'Year_' + year + '.json';

    //console.log(playerDataFile);
    //console.log(yearDataFile);

    d3.json(playerDataFile, function(err, data) {
        playerData = data;
        //console.log(playerData)

    });


    d3.json(yearDataFile, function(err, data) {
        yearMatchData = data;
        makeChart();
    });


}





function translateSVG(x, y) {
    return 'translate('+x+','+y+')';
}

function arcSVG(d, mx0, my0, rx, ry, xrot, larc, sweep, mx1, my1) {



    d3.select("#rightdiv")
        .append('p')
        //.classed('winlose', true)
        .attr('id', 'winlose')
        .text(d.winner + " beats " + d.player2 + " in " + d.round + " round.");

    //console.log(mx0);

    return 'M'+mx0+','+my0+' A'+rx+','+ry+' '+xrot+' '+larc+','+sweep+' '+mx1+','+my1;
}

function surname(d) {
    return d.name.split(' ')[0];
}

function fullname(d) {

    var s = d.player.split(' ');

    var newname =  s.length === 3 ? s[2] + ' ' + s[0] + ' ' + s[1] : s[1] + ' ' + s[0];

    //console.log(s);
    return newname
}

function nameId(n) {
    return n.replace(/[\., ]/g, '');
}



function DisplayPlayerStats(d){

    // d3.select("#rightdiv")
    //     .append('p');


    var playerName = d.player;

    d3.select('#displayPlayerData').text(playerName + " ( " + currentYear + " )");

    var pData = _.filter(allPlayerData['values'], function(v){return v.player1 === d.player || v.player2 === d.player;});
    console.log(pData);

    var pData2004 = _.filter(pData, function(v){return v.year === 2004;});
    console.log(pData2004);

    var pData2005 = _.filter(pData, function(v){return v.year === 2005;});
    console.log(pData2005);

    var pData2006 = _.filter(pData, function(v){return v.year === 2006;});
    console.log(pData2006);

    var pData2007 = _.filter(pData, function(v){return v.year === 2007;});
    console.log(pData2007);

    var pData2008 = _.filter(pData, function(v){return v.year === 2008;});
    console.log(pData2008);

    var pData2009 = _.filter(pData, function(v){return v.year === 2009;});
    console.log(pData2009);

    var pData2010 = _.filter(pData, function(v){return v.year === 2010;});
    console.log(pData2010);

    var pData2011 = _.filter(pData, function(v){return v.year === 2011;});
    console.log(pData2011);

    var pData2012 = _.filter(pData, function(v){return v.year === 2012;});
    console.log(pData2012);

    var pData2013 = _.filter(pData, function(v){return v.year === 2013;});
    console.log(pData2013);

    var pData2014 = _.filter(pData, function(v){return v.year === 2014;});
    console.log(pData2014);

    var yearwiseData = [pData2004, pData2005, pData2006, pData2007, pData2008, pData2009, pData2010, pData2011, pData2012, pData2013, pData2014];


    var ylabel = {};

    for (var index = 0; index < yearwiseData.length; index++)
    {
        ylabel[2004+index] = index * 25;// yearwiseData[index]
    }

    console.log('Yearwise = ');
    console.log(yearwiseData);

    //Remove previous data

    d3.select('#svgBarChart').remove();
    d3.select('#svgtextlabel').remove();


    var width = 300;   //50 each 50 * 7 = 350
    var height = 500;  //50 each. 50 * 10 = 500 + 10 gap

    var widthScale = d3.scale.linear()
        .domain([0,7])
        .range([0, width - 80]);

    var color = d3.scale.linear()
        .domain([0,7])
        .range(["red", "blue"]);


    // console.log(d3.entries(ylabel));

    gr = d3.select("#rightdiv");

    console.log("GR");
    console.log(gr);
        //gr.attr('transform', translateSVG(5,50))
    gr.append('svg')
        .attr('id', 'svgtextlabel')
        .attr("width", 50)
        .attr("height", height)
        .attr('transform', 'translate(10,50)')
        .append('g')
        .selectAll('p')
        .data(d3.entries(ylabel))
        .enter()
            .append("text")
            .attr("class", "x label")
            //.attr("text-anchor", "end")
            .attr("dy", ".75em")
            .attr("x", 0)
            .attr("y", function(d) { console.log("Debug value"); console.log(d.value); return d.value})
            .text(function(d) { console.log("Debug key"); console.log(d.key); return d.key});


    // d3.select('#svgBarChart').remove();


    var selection = d3.select("#rightdiv")
        .append('svg')
        .attr('id', 'svgBarChart')
        .attr("width", width)
        .attr("height", height)
        .attr('transform', translateSVG(60,50))
        .append('g')
        .selectAll('.bar')
        .data(yearwiseData)
        .enter();

        selection.append("rect")
        .attr("width", function(d) {console.log(d.length);return widthScale(d.length);})
        .attr("height", 20)
        .attr("y", function(d, i){ console.log("Ylabel"); console.log(d);  ylabel[2004+i] = i*25; return i * 25;})
        .attr("fill", function(d){return color(d.length);});



        selection.append('text')
        .attr("class", "round")
        //.attr("text-anchor", "end")
        .attr("dy", ".75em")
        .attr("x", function(d){return widthScale(d.length + 1);})
        .attr("y", function(d, i) { console.log("Debug value"); console.log(d.value); return i*25})
        .text(function(d) { console.log("Debug key"); console.log(d.value/25); console.log(['','First', 'Second', 'Third', 'Fourth', 'Quarter', 'Semi', 'Final', 'Winner'][d.length]); return ['','First', 'Second', 'Third', 'Fourth', 'Quarter', 'Semi', 'Final', 'Winner'][d.length]});

    console.log("Ylabel = ");
    console.log(ylabel);
    console.log(d3.entries(ylabel));

}

function playerOver(d) {



    // console.log(winl);
    // winl = winl.remove();

    //console.log(d);
    //console.log(yearMatchData['values'])

    var winl = d3.selectAll("#winlose").remove();
    d3.selectAll('#pathedge').remove();


    // Render arrows
    var m = _.filter(yearMatchData['values'], function(v) {return v.player1 === d.player || v.player2 === d.player;}); //select the plays in which player 'd' won or lost

    //console.log(m);

    var topMatches = d3.select('#chart svg g.top-matches')
        .selectAll('path')
        .data(m);

    //console.log(m);
    //console.log(matchData);

    topMatches.enter()
        .append('path')
        .classed('edge', true);

    topMatches.exit()
        .remove();

    topMatches
        .attr('d', function(d, i) {
            //console.log(playerPos);
            //console.log(d);
            console.log(d.winner);
            console.log(d.player2);

            //return arcSVG(d.winnerX, d.winnerY, 800, 800, 0, 0, 1, d.loserX, d.loserY);

            try {
                return arcSVG(d, playerPos[d.winner].x, playerPos[d.winner].y, 800, 800, 0, 0, 1, playerPos[d.player2].x, playerPos[d.player2].y);
            }
            catch(err){
                console.log('Exception');
            }
        })
        .attr('id', 'pathedge')
        .attr('marker-start', 'url(#markerCircle)')
        .attr('marker-end', 'url(#markerArrow)');

    // Highlight player

    var p = d3.select('.players').selectAll('circle').style('fill', '#92b8f9');

    d3.select(this)
        .style('fill', '#528dc1')
        .attr('r', 40);



    //console.log(this);
    //console.log(p);

    //Display Player Stats
    DisplayPlayerStats(d);

}

function playerOut(d) {
    d3.select(this)
        .style('fill', '#36bbc1')
        .attr('r', 30);


}



function makeChart() {

    //console.log(playerData['values'][0]);

    // for (i = 0; i < 120; i++)
    // {
    //     d3.select("#rightdiv")
    //         .append("p")
    //         .text(playerData['values'][i].player + playerData['values'][i].country);
    // }



    // Render players
    var players = d3.select('#chart svg')
        .append('g')
        .classed('players', true)
        .attr('transform', translateSVG(radius + padding, radius + padding))
        .selectAll('g')
        .data(playerData['values'])
        .enter()
        .append('g')
        .sort(function(a, b) {return d3.ascending(a.player, b.player);})          //sorting all the names
        .attr('id', function(d) { return 'player-'+ d.player;} )//nameId(d.name);})
        .classed('player', true)

        .attr('transform', function(d, i) {
            var row = Math.floor(i / cols), col = i % cols;
            var x = 2 * col * (radius + padding), y = 2 * row * (radius + padding);
            playerPos[d.player] = {x: x, y: y};
            return translateSVG(x, y);
        });




    players
        .append('circle')
        .attr('r', radius)
        .on('mouseover', playerOver)
        .on("mouseout", playerOut);


    players
        .append('text')
        .text(function(d) {return fullname(d).slice(0, 10);})
        .classed('name', true)
        .attr('y', '0.2em');



    // Front layer for matches of selected player
    var topMatches = d3.select('#chart svg')
        .append('g')
        .attr('transform', translateSVG(radius + padding, radius + padding))
        .classed('top-matches', true);

}



/*Other Functions*/

function selectYearData(d){

    //Clear the elements created by the previous load

    d3.select('#chart svg g.players').remove();
    d3.select('#chart svg g.top-matches').remove();
    playerPos = {};

    d3.select('#yearSelectButton').text('Year - ' + d);
    currentYear = d;
    loadYearData(d);

    console.log(d);
}