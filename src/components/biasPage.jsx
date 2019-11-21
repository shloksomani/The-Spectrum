import React, { Component } from "react";
// import parsed_data from "../assets/data/data";
import Container from "./container";
import Error from "./error";

export class BiasPage extends Component {
  render() {
    return (
      // <React.Fragment>
      <React.Fragment>{this.handleBias()}</React.Fragment>
      // </React.Fragment>
    );
  }

  handleBias = () => {
    let v = [];
    let p = this.handelNavRouting();
    // console.log(p);
    // console.log(this.props.match.params.id)
    if (p) {
      // console.log("at line 17");
      v = [this.props.parsed_data];
      console.log(v);
      // for (let bias in this.props.parsed_data) {
      //   console.log(bias);
      // }
      // Todo - object is not getting parsed
      if (!Array.isArray(this.props.parsed_data)) {
        v = this.props.parsed_data[this.props.match.params.id];
        this.props.shuffle(v);
        return v.map((article, index) => {
          return <Container key={index} news={article}></Container>;
        });
      }
    } else {
      return <Error></Error>;
    }
    // this.props.shuffle(v);
    return v.map((article, index) => {
      return <Container key={index} news={article}></Container>;
    });
    // console.log(v);
  };

  handelNavRouting = () => {
    // console.log(this.props.match.params.id);
    let v = this.props.match.params.id;
    // console.log(v);
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
