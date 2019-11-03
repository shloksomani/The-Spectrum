let consumption = document.getElementById("Schart");
let myBarChart;


let todayHistory = [10, 10, 10, 10, 20, 20, 20]
let thisWeekHistory = [20, 10, 10, 10, 10, 10, 30]
let thisMonthHistory = [10, 20, 10, 10, 10, 10, 30]
let eternityHistory = [10, 10, 20, 10, 10, 10, 30]




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
			legend: {
				display: true,
				labels: {
					fontColor: 'rgb(256,256,256)',
					position: "top",
					align: "center"
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



function toggle(e){
	myBarChart.destroy();
	let dataToBe;
	// console.log(e.target.innerHTML)
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

