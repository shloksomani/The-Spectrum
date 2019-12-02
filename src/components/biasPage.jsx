import React, { Component } from "react";
import Container from "./container";
import Error from "./error";

export class BiasPage extends Component {
  render() {
    return <React.Fragment>{this.handleBias()}</React.Fragment>;
  }

  handleBias = () => {
    let v = [];
    let p = this.handleNavRouting();

    if (p) {
      v = [this.props.parsed_data];

      if (!Array.isArray(this.props.parsed_data)) {
        v = this.props.parsed_data[this.props.match.params.id];

        this.props.shuffle(v);

        return v.map((article, index) => {
          return (
            <Container
              key={index}
              news={article}
              isLoggedIn={this.props.isLoggedIn}
            ></Container>
          );
        });
      }
    } else {
      return <Error></Error>;
    }

    return v.map((article, index) => {
      return <Container key={index} news={article}></Container>;
    });
  };

  handleNavRouting = () => {
    let v = this.props.match.params.id;

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
