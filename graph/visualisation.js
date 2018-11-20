function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

var DATA;

whenDocumentLoaded(() => {
	$.getJSON("./all_songs_pca.json", function(json) {
		var graph = new Graph(json);
		graph.redraw();
	});
});

class Graph {
	constructor(data) {
		this.data = data["2002"].slice(0, 20);
		this.xScale = d3.scaleLinear().domain([d3.min(this.data, d => d.x), d3.max(this.data, d => d.x)])
		                              .range([0, 100]);
		this.yScale = d3.scaleLinear().domain([d3.min(this.data, d => d.y), d3.max(this.data, d => d.y)])
		                              .range([100, 0]);
		this.rScale = d3.scaleLinear().domain([1, 200])
									  .range([1, 10]);
									  
		// this.canvas = d3.select("#container")
						// .append("canvas")
						// .attr("width", 640)
						// .attr("height", 480);
		// this.context = canvas.node().getContext("2d");
		// this.simulation = d3.forceSimulation(this.data)
							 // .force('charge', d3.forceManyBody().strength(0.1))
							 // .force('collision', d3.forceCollide().radius(5))
							 // .on("tick", () => {
								 // var svg = d3.select("#vis");
								 // svg.selectAll("circle")
								    // .data(this.data)
								    // .enter()
								    // .append("circle")
								    // .attr("cx", d => this.xScale(d.x))
								    // .attr("cy", d => this.yScale(d.y))
								    // .attr("r", d => 1)
								    // .style("fill", "rgb(255, 255, 0)")
								    // .style("stroke", "rgb(10, 10, 10)")
								    // .on("mouseover", clicked);
							 // });
	}
	
	redraw() {
		// var svg = d3.select("#vis");
		// svg.selectAll("circle")
		   // .data(this.data)
		   // .enter()
		   // .append("circle")
		   // .attr("cx", d => this.xScale(d.x))
		   // .attr("cy", d => this.yScale(d.y))
		   // .attr("r", d => 1)
		   // .style("fill", d => d.img_src)
		   // .on("mouseover", clicked);
		   
		// var simulation = d3.forceSimulation(this.data)
						   // .force('collision', d3.forceCollide().radius(1))
						   // .on("tick", () => {
							   // svg.selectAll("circle")
							      // .attr("cx", d => this.xScale(d.x))
							      // .attr("cy", d => this.yScale(d.y));
						   // });
		var svg = d3.select("#vis");
		var images = svg.selectAll("image")
						.data(this.data)
						.enter()
						.append("image")
						.attr("xlink:href", d => d.img_src)
						.attr("x", d => this.xScale(d.x))
						.attr("y", d => this.yScale(d.y))
						.attr("height", 3)
						.attr("widht", 3)
						.on("mouseover", clicked);
	}
}

function clicked(d, i) {
    d3.select(this)
	  .transition()
	  .attr("height", "10")
	  .attr("width", "10");
}