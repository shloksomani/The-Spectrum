let consumption = document.getElementById("Schart");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;

let bias = {
	labels: [
		"Left Bias",
		"Left-Center Bias",
		"Least Biased",
		"Right-Center Bias",
		"Right biased",
		"Pro-Science",
		"Questionable Sources"
	],
	datasets: [
		{
			data: [10, 10, 10, 10, 10, 10, 40],
			backgroundColor: [
				"#FF6384",
				"#63FF84",
				"#84FF63",
				"#8463FF",
				"#6384FF",
				"#6384FF",
				"#6384FF"
			]
		}
	]

};


init()

function init() {
	// Chart declaration:
	myBarChart = new Chart(consumption, {
		type: "pie",
		data: bias,
		options: {
			title: {
				display: true,
				text: ''
			}
		}

	});
}

function toggleChart() {
	//destroy chart:
	myBarChart.destroy();
	//change chart type: 
	this.chartType = (this.chartType == 'bar') ? 'line' : 'bar';
	//restart chart:
	init();
}

function addData(chart, label, data) {
	chart.data.labels.push(label);
	chart.data.datasets.forEach((dataset) => {
		dataset.data.push(data);
	});
	chart.update();
}

function removeData(chart) {
	chart.data.labels.pop();
	chart.data.datasets.forEach((dataset) => {
		dataset.data.pop();
	});
	chart.update();
}
