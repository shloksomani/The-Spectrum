import React, { Component } from "react";
import Chart from "chart.js";

let todayHistory = [10, 10, 10, 10, 20, 20, 20];
let thisWeekHistory = [20, 10, 10, 10, 10, 10, 30];
let thisMonthHistory = [10, 20, 10, 10, 10, 10, 30];
let eternityHistory = [10, 10, 20, 10, 10, 10, 30];

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

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.init();
    this.setListeners();
  }

  init = () => {
    this.myChart = new Chart(this.chartRef.current, {
      type: "pie",
      data: bias,
      options: {
        legend: {
          display: true,
          labels: {
            fontColor: "rgb(256,256,256)",
            position: "top",
            align: "center",
            responsive: "true"
          }
        }
      }
    });
    // this.myChart.defaults.global.defaultFontFamily = "Lato";
    // this.myChart.defaults.global.defaultFontSize = 18;
  };

  setListeners = () => {
    document.getElementById("today").addEventListener("click", this.toggle);
    document.getElementById("thisWeek").addEventListener("click", this.toggle);
    document.getElementById("thisMonth").addEventListener("click", this.toggle);
    document.getElementById("eternity").addEventListener("click", this.toggle);
  };

  toggle = e => {
    console.log("inside toggle");

    this.myChart.destroy();
    let dataToBe;
    document.querySelector(".smth").innerHTML = e.target.innerHTML;
    if (e.target.innerHTML === "Today") {
      dataToBe = todayHistory;
    } else if (e.target.innerHTML === "This Week") {
      dataToBe = thisWeekHistory;
    } else if (e.target.innerHTML === "This Month") {
      dataToBe = thisMonthHistory;
    } else if (e.target.innerHTML === "Eternity") {
      dataToBe = eternityHistory;
    }
    this.myChart.data.datasets[0].data = dataToBe;
    this.init();
  };

  render() {
    return <canvas ref={this.chartRef} id="Schart" width="800" height="450" />;
  }
}

export default PieChart;
