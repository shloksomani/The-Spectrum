import React, { Component } from "react";
//import parsed_data from "../assets/data/data";
import Container from "./container";

export class Home extends Component {
  render() {
    return <React.Fragment>{this.getData()}</React.Fragment>;
  }

  getData = () => {
    const data1 = {};
    data1.dummy_data = [];
    for (let bias in this.props.parsed_data) {
      // List of articles that have the bias
      const bias_list = this.props.parsed_data[bias];
      for (let i = 0; i < 2; i++) {
        // each article in the article list
        const article = bias_list[i];
        data1.dummy_data.push(article);
      }
    }
    // for each bias
    let v = data1.dummy_data;
    this.props.shuffle(v);
    return v.map((article, index) => {
      return <Container key={index} news={article}></Container>;
    });
  };
}

export default Home;
