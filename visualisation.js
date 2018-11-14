var general_json;
var genre_list = ['pop','folk','jazz/soul','hiphop','rock','metal','latin','dance','disco/funk','electro'];
var mean_genre = {}
var index_genre = {};
for (g in genre_list){
	genre_i = genre_list[g];
	index_genre[genre_list[g]] = {};
	mean_genre[genre_list[g]] = {};
	for (var i = 1959; i <= 2017; i++){
		index_genre[genre_i][i] = [];
		mean_genre[genre_i][i] = 0;
	}
}

var colors = ["blue","yellow","green","brown","red","black","purple","cyan","pink","magenta"];



function whenDocumentLoaded(action) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", action);
	} else {
		// `DOMContentLoaded` already fired
		action();
	}
}

class ScatterPlot {
	constructor(type,data){
		var svg = d3.select("#"+type);
		var xscale = d3.scaleLinear()
			.domain([1959,2017])
			.range([0,200]);
		var yscale = d3.scaleLinear()
			.domain([-1,1])
			.range([100,0]);
		var lineGenerator = d3.line()
							  .x(d => xscale(d.year))
							  .y(d => yscale(d.score));
							  //.style("fill", d => colors[genre_list.indexOf(d.genre)]);
		/**					  
		svg.append("path")
				.attr("d",lineGenerator(data))
				.attr("fill", "none")
				.attr('stroke',"red");*/
						  
		for (i in genre_list){
			svg.append("path")
				.attr("d",lineGenerator(data.filter(d => d.genre == genre_list[i])))
				.attr("fill", "none")
				.attr('stroke',colors[i]);
		}
		
		/**
		svg.selectAll("circle")
  			.data(data)
			.enter()
			.append("circle")
			.attr("cx", function(d) { return xscale(d.year); })
    		.attr("cy", function(d) { return yscale(d.score); })
    		.attr("r", 1.0)
			.style("fill", function(d) { return colors[genre_list.indexOf(d.genre)]; });*/
		
	}
}

whenDocumentLoaded(() => {
	data = []
	$.getJSON("./songs_lyrics_positivity.json", function(json) {
		general_json = json;
		
		for( var i = 0; i< general_json.length ; ++i){
			index_genre[general_json[i].genre][general_json[i].year].push(i);
			mean_genre[general_json[i].genre][general_json[i].year] += general_json[i].score ;
		}
		
		for( g in genre_list){
			genre_i = genre_list[g];
			for (var i = 1959; i <= 2017; i++){
				var nb = index_genre[genre_i][i].length;
				if (nb > 10){					
					mean_genre[genre_i][i] /= nb;
					data.push({'genre':genre_i,'year':i,'score':mean_genre[genre_i][i]});
				}
				
			}
		}
		/**
		for (var i = 1959; i <= 2017; i++){
			var nb = 0;
			var score = 0
			for( g in genre_list){
				genre_i = genre_list[g];
				nb += index_genre[genre_i][i].length;
				score += mean_genre[genre_i][i];
			}
			if (score >0){
				data.push({'year':i,'score':score/nb});
			}
		}*/
		//console.log(json);
		console.log(data);
		const plot = new ScatterPlot('plot', data);
	});

	
	/**
	d3.json("./songs_lyrics_positivity.json", function(json){
		const plot = new ScatterPlot('plot', json);
		
	});*/
	
});