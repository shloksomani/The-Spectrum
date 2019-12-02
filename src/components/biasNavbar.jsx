import React, { Component, Redirect } from "react";
import { Link } from "react-router-dom";
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
                <Link
                  to="/left_center_bias"
                  className="nav-link"
                  onClick={this.handelBias}
                >
                  Left Center Bias
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/least_bias"
                  className="nav-link"
                  onClick={this.handelBias}
                >
                  Least Biased
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/right_center_bias"
                  className="nav-link"
                  onClick={this.handelBias}
                >
                  Right Center Bias
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/right_bias"
                  className="nav-link"
                  onClick={this.handelBias}
                >
                  Right Bias
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/pro_science"
                  className="nav-link"
                  onClick={this.handelBias}
                >
                  Pro Science
                </Link>
              </li>
              <li className="nav-item">
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
              <form className="form-inline" onSubmit={this.handleSearch}>
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
          // console.log("search successful!");
          // console.log(res.data.data);
          this.props.setSearchData(res.data.data);
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
