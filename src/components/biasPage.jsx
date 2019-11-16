import React, { Component } from "react";
import parsed_data from "../assets/data/data";
import Container from "./container";
import Error from "./error";

export class BiasPage extends Component {
  // state = {
  //   data: []
  // };

  // componentWillMount() {
  //   this.getDataFromDb();
  // }

  render() {
    return (
      // <React.Fragment>
      <React.Fragment>{this.handleBias()}</React.Fragment>
      // </React.Fragment>
    );
  }

  // getDataFromDb = () => {
  //   fetch("http://localhost:5000")
  //     .then(data => data.json())
  //     .then(res => this.setState({ data: JSON.parse(res.data) }))
  //     .then(console.log(this.state));
  // };

  handleBias = () => {
    let v = [];
    let p = this.handelNavRouting();
    console.log(p);
    if (p) {
      console.log("at line 17");
      v = parsed_data[this.props.match.params.id];
    } else {
      return <Error></Error>;
    }
    return v.map((article, index) => {
      return <Container key={index} news={article}></Container>;
    });
  };

  handelNavRouting = () => {
    console.log(this.props.match.params.id);
    let v = this.props.match.params.id;
    console.log(v);
    if (v) {
      let storedBiases = [
        "left_bias",
        "left_center_bias",
        "least_bias",
        "right_center_bias",
        "right_bias",
        "pro_science",
        "questionable_sources"
      ];
      let found = storedBiases.find(function(element) {
        return element === v;
      });
      return found ? true : false;
    } else {
      return false;
    }
  };
}

export default BiasPage;
