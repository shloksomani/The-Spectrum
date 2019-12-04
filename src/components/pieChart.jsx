import React, { Component } from "react";
import Chart from "chart.js";
let filterToday = new Date(new Date() - 24 * 60 * 60 * 1000);
let filterWeek = new Date(new Date() - 24 * 7 * 60 * 60 * 1000);
let filterThisMonth = new Date(new Date() - 24 * 30 * 60 * 60 * 1000);

let todayHistory = [0, 0, 0, 0, 0, 0, 0];
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
      data: todayHistory,
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
  };

  setListeners = () => {
    document.getElementById("today").addEventListener("click", this.toggle);
    document.getElementById("thisWeek").addEventListener("click", this.toggle);
    document.getElementById("thisMonth").addEventListener("click", this.toggle);
    document.getElementById("eternity").addEventListener("click", this.toggle);
  };

  increment = (article, pieChartArr) => {
    console.log(pieChartArr);
    if (article.bias === "left_bias") {
      pieChartArr[0]++;
    }
    if (article.bias === "left_center_bias") {
      pieChartArr[1]++;
    }
    if (article.bias === "least_bias") {
      pieChartArr[2]++;
    }
    if (article.bias === "right_center_bias") {
      pieChartArr[3]++;
    }
    if (article.bias === "right_bias") {
      pieChartArr[4]++;
    }
    if (article.bias === "pro_science_bias") {
      pieChartArr[5]++;
    }
    if (article.bias === "questionable_sources_bias") {
      pieChartArr[6]++;
    }
  };

  todayFilter = () => {
    if (this.props.history) {
      this.props.history.map(user => {
        user.date = new Date(user.date);
        //console.log(typeof filterToday);
        if (user.date > filterToday) {
          this.increment(user.article, todayHistory);
          this.increment(user.article, thisWeekHistory);
          this.increment(user.article, thisMonthHistory);
          this.increment(user.article, eternityHistory);
        }
      });
      console.log(todayHistory);
    }
  };

  weekFilter = () => {
    this.props.history.map(user => {
      user.date = new Date(user.date);
      if (user.date > filterWeek) {
        this.increment(user.article, thisWeekHistory);
        this.increment(user.article, thisMonthHistory);
        this.increment(user.article, eternityHistory);
      }
    });
  };

  monthFilter = () => {
    this.props.history.map(user => {
      user.date = new Date(user.date);
      if (user.date > filterThisMonth) {
        this.increment(user.article, thisMonthHistory);
        this.increment(user.article, eternityHistory);
      }
    });
  };

  allFilter = () => {
    this.props.history.map(user => {
      user.date = new Date(user.date);
      this.increment(user.article, eternityHistory);
    });
  };

  toggle = e => {
    console.log("inside toggle");

    this.myChart.destroy();
    let dataToBe;
    document.querySelector(".smth").innerHTML = e.target.innerHTML;
    if (e.target.innerHTML === "Today") {
      todayHistory = [0, 0, 0, 0, 0, 0, 0];
      thisWeekHistory = [0, 0, 0, 0, 0, 0, 0];
      thisMonthHistory = [0, 0, 0, 0, 0, 0, 0];
      eternityHistory = [0, 0, 0, 0, 0, 0, 0];
      this.todayFilter();

      dataToBe = todayHistory;
    } else if (e.target.innerHTML === "This Week") {
      thisWeekHistory = [0, 0, 0, 0, 0, 0, 0];
      thisMonthHistory = [0, 0, 0, 0, 0, 0, 0];
      eternityHistory = [0, 0, 0, 0, 0, 0, 0];
      this.weekFilter();
      dataToBe = thisWeekHistory;
    } else if (e.target.innerHTML === "This Month") {
      thisMonthHistory = [0, 0, 0, 0, 0, 0, 0];
      eternityHistory = [0, 0, 0, 0, 0, 0, 0];
      this.monthFilter();
      dataToBe = thisMonthHistory;
    } else if (e.target.innerHTML === "Eternity") {
      eternityHistory = [0, 0, 0, 0, 0, 0, 0];
      this.allFilter();
      dataToBe = eternityHistory;
    }
    this.myChart.data.datasets[0].data = dataToBe;
    this.init();
    //this.props.changeState(true);
  };

  render() {
    return <canvas ref={this.chartRef} id="Schart" width="800" height="450" />;
  }
}

export default PieChart;
