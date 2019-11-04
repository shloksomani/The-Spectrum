
// Get the id of the pieChart in the dashboard 
let consumption = document.getElementById("Schart");
let myBarChart;

// HardCoded data for the history 
// A database will have all the user and a user will have all the history
// Currently all users will have the same data   
let todayHistory = [10, 10, 10, 10, 20, 20, 20]
let thisWeekHistory = [20, 10, 10, 10, 10, 10, 30]
let thisMonthHistory = [10, 20, 10, 10, 10, 10, 30]
let eternityHistory = [10, 10, 20, 10, 10, 10, 30]




Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;

// Setting up the bias
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


// Initializing the chart 
init()

// Initialization function 
function init() {
	// Chart declaration:
	myBarChart = new Chart(consumption, {
		type: "pie",
		data: bias,
		options: {
			legend: {
				display: true,
				labels: {
					fontColor: 'rgb(256,256,256)',
					position: "top",
					align: "center",
					responsive: "true"
				}
			}
		}

	});
}

// set listeners on buttons
document.getElementById('today').addEventListener('click', toggle);
document.getElementById('thisWeek').addEventListener('click', toggle);
document.getElementById('thisMonth').addEventListener('click', toggle);
document.getElementById("eternity").addEventListener('click', toggle);


// A toggle to dynamically change the pie chart with the hard-coded data  
function toggle(e){
	myBarChart.destroy();
	let dataToBe;
	document.querySelector(".smth").innerHTML = e.target.innerHTML
	if (e.target.innerHTML === "Today"){
		dataToBe = todayHistory;
	}
	else if (e.target.innerHTML === "This Week") {
		dataToBe = thisWeekHistory;
	}
	else if (e.target.innerHTML === "This Month") {
		dataToBe = thisMonthHistory;
	}
	else if (e.target.innerHTML === "Eternity") {
		dataToBe = eternityHistory;
	}
	myBarChart.data.datasets[0].data = dataToBe;
	init();
}

