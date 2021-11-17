"use strict";
  
//window.onload = renderMyChart;
// function triggerBarHighlight(stateName){
//     //Task 2 Step 1: Update function
//     document.getElementById(stateName+'Bar').classList.remove('bar');
//     document.getElementById(stateName+'Bar').classList.add('barHover')
// }
// //Task 2 Step 2:Define reset function
// function triggerBarReset(stateName){
//     document.getElementById(stateName+'Bar').classList.remove('barHover');
//     document.getElementById(stateName+'Bar').classList.add('bar')
// }
// //Task 3: Trigger bar highlight on click
// function triggerBarSignal(stateName){
//     document.getElementById(stateName+'Bar').classList.remove('bar');
//     document.getElementById(stateName+'Bar').classList.add('barSignal')
// }
// //Task:3 reset to mouse over function upon rightclick
// function triggerBarSignalReset(stateName){
//     document.getElementById(stateName+'Bar').classList.remove('barSignal');
//     document.getElementById(stateName+'Bar').classList.add('barHover')
// }

function renderMyChart() {
    var svg = d3.select("#exchart").append("svg:svg")
        .attr("width", 850)//canvasWidth)
        .attr("height", 250),//canvasHeight);
        margin = { top: 20, right: 20, bottom: 30, left: 70 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // change the dataset
    d3.csv("2015pop.csv").then(function (d) {
        // change the y value
        d.Pop = +d.Pop;

        x.domain(d.map(function (data) { return data.States; }));
        y.domain([0, d3.max(d, function (data) { return data.Pop; })]);

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(10))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Population");

        g.selectAll(".bar")
            .data(d)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return x(d.States); })
            .attr("y", function (d) { return y(d.Pop); })
            .attr("width", x.bandwidth())
            .attr("height", function (d) { return height - y(d.Pop); })
            //Task 2 Step 1:Define HTML id for each bar
            .attr("id",function(data){return data.States + "Bar"; }) //Give each state bar id to reach eachother
            //Task 1 Step 1: Determine state being moused over on bar chart
            // .on("mouseover", function (event, data){
            //     //console.log("Mouse is on "+data.States)
            //     //Task 1 Step 2: Call highlighter
            //     triggerMapHighlight(data.States);
            // })
            // .on("mouseout", function (event, data) {
            //     console.log("Mouse moved out of "+data.States);
            //     triggerMapReset(data.States);
            // })
            // .on("click",function(event,data){
            //     console.log("Clicked on"+data.States);
            //     triggerMapSignal(data.States);
            //});
        return d;
    }).catch(function (error) {
        
        if (error) throw error;
    });
    }