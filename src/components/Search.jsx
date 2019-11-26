import React, { Component } from "react";
import Container from "./container";

export class Search extends Component {
  render() {
    return <React.Fragment>{this.getSearchData()}</React.Fragment>;
  }

  getSearchData = () => {
    const data1 = {};
    data1.dummy_data = [];
    console.log(this.props.searchData);

    if (this.props.searchData.length > 0) {
      data1.dummy_data = this.props.searchData;
    } else {
      const data = this.props.parsed_data;
      for (let bias in data) {
        // List of articles that have the bias
        const bias_list = data[bias];
        for (let i = 0; i < 2; i++) {
          // each article in the article list
          const article = bias_list[i];
          data1.dummy_data.push(article);
        }
      }
    }
    // for each bias
    let v = data1.dummy_data;
    console.log(v);

    this.props.shuffle(v);
    return v.map((article, index) => {
      //console.log(article);

      return (
        <Container
          key={index}
          news={article}
          isLoggedIn={this.props.isLoggedIn}
        ></Container>
      );
    });
  };
}

export default Search;
