var oilCanvas = document.getElementById("Schart");

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

var pieChart = new Chart(oilCanvas, {
	type: "pie",
	data: bias
});
