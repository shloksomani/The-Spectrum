import React, { Component, Redirect } from "react";
import { Link } from "react-router-dom";
import searchBroken from "../assets/image/noSearch.png";
import axios from "axios";

export class BiasNavbar extends Component {
  state = { keywords: "", redirect: false };
  render() {
    return (
      <React.Fragment>
        <nav id="mediaMenu" className="navbar navbar-expand-lg navbar-light">
          <div
            className="collapse navbar-collapse navbarCombine"
            id="navbarText"
          >
            <ul className="navbar-nav mr-auto">
              <li
                className="nav-item"
                datatoggle="collapse"
                datatarget=".navbar-collapse.show"
              >
                <Link
                  to="/left_bias"
                  className="nav-link"
                  onClick={this.handelBias}
                >
                  Left Bias
                </Link>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link LCB" href="#" onClick={this.handelBias}>
									Left Center Bias
								</a> */}
                <Link
                  to="/left_center_bias"
                  className="nav-link"
                  onClick={this.handelBias}
                >
                  Left Center Bias
                </Link>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link LeastB" onClick={this.handelBias}>
									Least Biased
								</a> */}
                <Link
                  to="/least_bias"
                  className="nav-link"
                  onClick={this.handelBias}
                >
                  Least Biased
                </Link>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link RCB" href="#" onClick={this.handelBias}>
									Right Center Bias
								</a> */}
                <Link
                  to="/right_center_bias"
                  className="nav-link"
                  onClick={this.handelBias}
                >
                  Right Center Bias
                </Link>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link RB" href="#" onClick={this.handelBias}>
									Right Bias
								</a> */}
                <Link
                  to="/right_bias"
                  className="nav-link"
                  onClick={this.handelBias}
                >
                  Right Bias
                </Link>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link PS" href="#" onClick={this.handelBias}>
									Pro Science
								</a> */}
                <Link
                  to="/pro_science"
                  className="nav-link"
                  onClick={this.handelBias}
                >
                  Pro Science
                </Link>
              </li>
              <li className="nav-item">
                {/* <a className="nav-link QS" href="#" onClick={this.handelBias}>
									Questionable Sources
								</a> */}
                <Link
                  to="/questionable_sources"
                  className="nav-link"
                  onClick={this.handelBias}
                >
                  Questionable Sources
                </Link>
              </li>
            </ul>

            <span className="navbar-text d-none d-lg-block d-xl-block">
              <form
                className="form-inline"
                onSubmit={this.handleSearch}
                //action="/index/keywords"
                //method="GET"
              >
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  name="user_search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={event => {
                    this.setState({ keywords: event.target.value });
                  }}
                />
                <button
                  className="btn my-2 my-sm-0 searchBtnMediaMenu"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </span>
          </div>
        </nav>
      </React.Fragment>
    );
  }

  handleSearch = e => {
    e.preventDefault();
    axios
      .post("/keywords", { keywords: this.state.keywords })
      .then(res => {
        if (res.status === 200) {
          if (res.data.data.length > 0) {
            console.log("search successfulll!");
            console.log(res.data.data.length);
            this.props.setSearchData(res.data.data);
          } else {
            this.props.setSearchData([
              {
                title: "NO SEARCH RESULTS FOR THIS!",
                authors: [],
                text: "",
                summary: "No articles match the word you have searched for",
                published: new Date(),
                keywords: [],
                top_image: searchBroken,
                url: "#",
                brand: "",
                mbfc: "#",
                bias: ""
              }
            ]);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handelBias = event => {
    this.props.setterParent(event.target.innerHTML);
  };
}

export default BiasNavbar;
