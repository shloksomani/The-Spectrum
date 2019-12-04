import React, { Component } from "react";
import searchLens from "../assets/image/search.png";
import logo from "../assets/image/Untitled3.png";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export class TopNavbar extends Component {
  // componentWillReceiveProps() {
  //   this.handelLoginNav();
  // }
  state = { redirect: null, keywords: "" };
  render() {
    return (
      <React.Fragment>
        <nav id="header" className="navbar navbar-expand-lg navbar-dark">
          <img className="headerLogo" src={logo}></img>
          <Link to="/" className="navbar-brand ml-2" onClick={this.handelBias}>
            The Spectrum
          </Link>

          <div className="d-flex ml-auto heree">
            <span className="search-icon"></span>
            <img
              className="search-svg"
              id="search-icon"
              src={searchLens}
              alt="search-icon"
              onClick={this.openSearch}
            ></img>
          </div>

          <div id="myOverlay" className="overlay">
            <span
              className="closebtn"
              onClick={this.closeSearch}
              title="Close Overlay"
            >
              ×
            </span>
            <div className="d-flex justify-content-center overlay-content">
              <span className="navbar-text d-lg-none d-xl-none searchBar">
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
                    className="btn my-2 my-sm-0 searchHeader"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              </span>
            </div>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target=".navbarCombine"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-right navbar-collapse navbarCombine"
            id="navbarTogglerDemo01"
          >
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0 ">
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={this.handelBias}>
                  Home
                </Link>
              </li>

              {this.handelLoginNav()}
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }

  handelBias = event => {
    this.props.setterParent("");
  };

  handelLoginNav = () => {
    console.log("in top navbar");
    if (this.props.isLoggedIn) {
      return (
        <React.Fragment>
          <li className="nav-item" id="Dash">
            <Link
              to="/auth/dashboard"
              className="nav-link"
              onClick={this.handelLogin}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item" id="logout">
            <Link
              to="/auth/login"
              className="nav-link"
              onClick={this.handelLogout}
            >
              Logout
            </Link>
          </li>
          <li className="nav-item" id="logout">
            <Link
              to="/auth/history"
              className="nav-link"
              onClick={this.handelLogin}
            >
              History
            </Link>
          </li>
          {this.props.username === "admin" && (
            <li className="nav-item" id="Admin">
              <Link
                to="/auth/admin"
                className="nav-link"
                onClick={this.handelLogin}
              >
                Admin
              </Link>
            </li>
          )}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <li className="nav-item" id="login">
            <Link
              to="/auth/login"
              className="nav-link"
              onClick={this.handelLogin}
            >
              Login
            </Link>
          </li>
          <li className="nav-item" id="signup">
            <Link
              to="/auth/signup"
              className="nav-link"
              onClick={this.handelLogin}
            >
              Sign Up
            </Link>
          </li>
        </React.Fragment>
      );
    }
  };

  handelLogin = e => {
    this.props.setRedirect(false);
  };

  handelLogout = e => {
    e.preventDefault();
    console.log("logging out");
    axios
      .post("/user/logout")
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          this.props.handelIsLoggedIn(false, null);
          document.location.href = "/auth/login";
        }
      })
      .catch(error => {
        console.log("Logout error");
      });
  };

  handleSearch = e => {
    e.preventDefault();
    axios
      .post("/keywords", { keywords: this.state.keywords })
      .then(res => {
        if (res.status === 200) {
          console.log("search successful!");
          console.log(res.data.data);
          this.props.setSearchData(res.data.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  openSearch = () => {
    document.getElementById("myOverlay").style.display = "block";
  };

  // To remove the overlay on smaller displays
  closeSearch = () => {
    document.getElementById("myOverlay").style.display = "none";
  };
}

export default TopNavbar;
