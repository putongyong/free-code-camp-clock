//create the title
    d3.select("main")
    .append("div")
    .attr("id", "title")
    .text("Monthly Global Land-Surface Temperature");

    d3.select("main")
    .append("div")
    .attr("id", "description")
    .text("1753 - 2015: base temperature 8.66℃");

//create the tooltip
    d3.select("body")
    .append("div")
    .attr("id", "tooltip")


    async function getData() {
        const response = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json');
        const dataset = await response.json();
        return dataset;
    }
    getData().then(dataset => {
        dataset; // fetched movies
        const baseTemp=dataset.baseTemperature;
        const data=dataset.monthlyVariance
        const years =[];
        const montes = [];
        console.log(data);
        createSVG(data);
      });  
    
function createSVG(data){

    var width = 1200;
    var height = 500;
    var svg = d3.select("main")
    
    .append("svg")
    .attr("width", width+100)
    .attr("height", height+100)

    const maxYear= d3.max(data, d => d.year);
    const minYear= d3.min(data, d => d.year);
    console.log(maxYear);
    console.log(minYear);
    const maxMonth= new Date(00,11,15);
    const minMonth= new Date(00,00,00);
    console.log(maxMonth);
    console.log(minMonth);
    const maxTemp= d3.max(data, d => d.variance);
    const minTemp= d3.min(data, d => d.variance);
    console.log(maxTemp);
    console.log(minTemp);


    const xScale = d3.scaleLinear()
    .domain([minYear,maxYear])
    .range([100,width-10])

    const yScale = d3.scaleTime()
    .domain([maxMonth,minMonth])
    .range([height-20,20])

    var xAxisTranslate = height-20;

    var x_axis = d3.axisBottom(xScale)
    .tickFormat(d3.format('d'));
 
    svg.append("g")
    .attr("id","x-axis")
    .attr("transform", "translate(0, " + xAxisTranslate  +")")
    .call(x_axis);

    var y_axis = d3.axisLeft(yScale)
    .tickFormat(d3.timeFormat('%B'));

    svg.append("g")
    .attr("id","y-axis")
    .attr("transform", "translate(100)")
    .call(y_axis);

    svg.append("g")
    .attr("id","legend")
    .append('rect')
    .style("fill","blue")
    .attr("width", 20)
    .attr("height",20)
	.attr("x", 600)
	.attr("y", 550)

    svg.append("g")
    .attr("id","legend")
    .append('rect')
    .style("fill","green")
    .attr("width", 20)
    .attr("height",20)
	.attr("x", 620)
	.attr("y", 550)

    svg.append("g")
    .attr("id","legend")
    .append('rect')
    .style("fill","yellow")
    .attr("width", 20)
    .attr("height",20)
	.attr("x", 640)
	.attr("y", 550)

    svg.append("g")
    .attr("id","legend")
    .append('rect')
    .style("fill","red")
    .attr("width", 20)
    .attr("height",20)
	.attr("x", 660)
	.attr("y", 550)

    svg.selectAll('rect')
         .data(data)
         .enter()
         .append('rect')
         .attr("class", "cell")
         .attr('x', (d)=> xScale(d.year))
         .attr('width',width/(maxYear-minYear))
         .attr('y', (d)=> yScale(new Date(00, d.month-2,15)))
         .attr('height',(height-40)/12)
         .attr('data-month',(d) => d.month-1)
         .attr('data-year',(d) => d.year)
         .attr('data-temp',(d)=>d.variance)
         .style("fill", (d) => {
            const variance = d.variance;
            if (variance <=-1){
                return 'blue';
            } else if (variance <=0){
                return 'green';
            } else if (variance <=1){
                return 'yellow';
            } else {
                return 'red';
            } 
         })
         .on("mouseout",(d)=> {
            d3.select("#tooltip")
            .style("visibility", "visible") 
         })
         .on("mouseover",(e,d) => {
            d3.select("#tooltip")
            .style("position", "absolute")
            .style("background-color","yellow")
            .style("opacity",".85")
            .style("border", "solid")
            .style("border-width", "1px")
            .style("border-radius", "5px")
            .style("top", e.pageY+"px")
            .style("left",e.pageX+6+"px")
            .attr("data-year",d.year)
            .html(`<p> Date:${d.year} </p>`)
            .style("visibility", "visible")
         })
         .on("mouseout",(d)=> {
            d3.select("#tooltip")
            .style("visibility", "hidden")            
         })
;

}
