import React, { Component } from "react";
import TopNavbar from "./topNavbar";
import BiasNavbar from "./biasNavbar";
import Container from "./container";
import parsed_data from "../data";
export class Page extends Component {
  state = {
    data: parsed_data,
    bias: ""
  };
  componentWillMount() {
    this.getData();
  }
  render() {
    console.log();
    return (
      <React.Fragment>
        <TopNavbar></TopNavbar>
        <BiasNavbar bias={this.state.bias}></BiasNavbar>

        {this.state.data.map((article, index) => {
          return <Container key={index} news={article}></Container>;
        })}
      </React.Fragment>
    );
  }

  getData = () => {
    const data = {};
    data.dummy_data = [];
    if (this.state.bias === "") {
      for (let bias in parsed_data) {
        // List of articles that have the bias
        const bias_list = parsed_data[bias];
        for (let i = 0; i < 2; i++) {
          // each article in the article list
          const article = bias_list[i];
          data.dummy_data.push(article);
        }
      }
      // for each bias
      this.setState({ data: data.dummy_data });
    }
  };
}

export default Page;
