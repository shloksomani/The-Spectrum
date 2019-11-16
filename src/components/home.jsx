import React, { Component } from "react";
import parsed_data from "../assets/data/data";
import Container from "./container";

export class Home extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.getDataFromDb();
  }

  render() {
    return <React.Fragment>{this.getData()}</React.Fragment>;
  }

  getDataFromDb = () => {
    fetch("http://localhost:5000")
      .then(data => data.json())
      .then(res => {
        this.setState({ data: res });
        console.log(res);
      });
  };

  getData = () => {
    const data1 = {};
    data1.dummy_data = [];
    for (let bias in this.state.data) {
      // List of articles that have the bias
      const bias_list = this.state.data[bias];
      for (let i = 0; i < 2; i++) {
        // each article in the article list
        const article = bias_list[i];
        data1.dummy_data.push(article);
      }
    }
    // for each bias
    let v = data1.dummy_data;
    return v.map((article, index) => {
      return <Container key={index} news={article}></Container>;
    });
  };
}

export default Home;
