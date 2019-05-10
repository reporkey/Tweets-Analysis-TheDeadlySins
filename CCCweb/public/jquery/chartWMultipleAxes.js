var options = {
	exportEnabled: true,
	animationEnabled: true,
	title:{
		text: "The trend of 'Fat' tweets in Melbourne"
	},
	axisX: {
		title: "Years"
	},
	axisY: {
		title: "Tweets Amount",
		titleFontColor: "#4F81BC",
		lineColor: "#4F81BC",
		labelFontColor: "#4F81BC",
		tickColor: "#4F81BC",
		includeZero: false
	},
	toolTip: {
		shared: true
	},
	legend: {
		cursor: "pointer",
		itemclick: toggleDataSeries
	},
	data: [{
		type: "spline",
		name: "Tweets Count",
		showInLegend: true,
		xValueFormatString: "YYYY",
		yValueFormatString: "#,##0 Tweets",
		dataPoints: [
			{ x: new Date(2014),  y: 120 },
			{ x: new Date(2015), y: 135 },
			{ x: new Date(2016), y: 144 },
			{ x: new Date(2017),  y: 103 },
			{ x: new Date(2018),  y: 93 }
		]
	}]
};
$("#chartAxes").CanvasJSChart(options);

function toggleDataSeries(e) {
	if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	} else {
		e.dataSeries.visible = true;
	}
	e.chart.render();
}

