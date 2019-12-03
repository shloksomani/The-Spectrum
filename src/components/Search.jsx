import React, { Component } from "react";
import Container from "./container";

export class Search extends Component {
  componentDidMount(){
    this.setListeners();
  }
  render() {
    return (
      <React.Fragment>
        <div className="dropdown d-flex justify-content-center filter-dash">
          <h4 className="d-inline-block align-middle heading dash" id="dash">
            Search Results:
          </h4>
          <button
            className="btn  dropdown-toggle smth dash"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Filter Bias
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button className="dropdown-item" id="leftTog" type="button">
              Left Bias
            </button>
            <button className="dropdown-item" id="leftCenTog" type="button">
              Left Center Bias
            </button>
            <button className="dropdown-item" id="leastTog" type="button">
              Least Bias
            </button>
            <button className="dropdown-item" id="rightTog" type="button">
              Right Bias
            </button>
            <button className="dropdown-item" id="rightCenTog" type="button">
              Right Center Bias
            </button>
            <button className="dropdown-item" id="sciTog" type="button">
              Pro Science
            </button>
            <button className="dropdown-item" id="qTog" type="button">
              Questionable Sources
            </button>
          </div>
        </div>
        {this.getSearchData()}
      </React.Fragment>
    );
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
      return (
        <Container
          key={index}
          news={article}
          isLoggedIn={this.props.isLoggedIn}
        ></Container>
      );
    });
  };
  setListeners = () => {
    console.log(document.getElementById("leftTog"));
    document.getElementById("leftTog").addEventListener("click", this.toggle);
    document.getElementById("leftCenTog").addEventListener("click", this.toggle);
    document.getElementById("rightTog").addEventListener("click", this.toggle);
    document.getElementById("sciTog").addEventListener("click", this.toggle);
    document.getElementById("qTog").addEventListener("click", this.toggle);
    document.getElementById("rightCenTog").addEventListener("click", this.toggle);
    document.getElementById("leastTog").addEventListener("click", this.toggle);
  };

  toggle = e => {
    console.log("inside toggle");
    document.querySelector("#dropdownMenu2").innerHTML = e.target.innerHTML;
  };
}

export default Search;
