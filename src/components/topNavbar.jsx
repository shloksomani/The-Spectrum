import React, { Component } from "react";
import searchLens from "../assets/image/loupe.svg";
import { Link } from "react-router-dom";

export class TopNavbar extends Component {
  componentWillReceiveProps() {
    this.handelLoginNav();
  }
  render() {
    return (
      <React.Fragment>
        <nav id="header" className="navbar navbar-expand-lg navbar-dark">
          {/* <a className="navbar-brand ml-2" href="/">
						The Spectrum
					</a> */}
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
                <form
                  className="form-inline"
                  action="/index/keywords"
                  method="GET"
                >
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    name="user_search"
                    placeholder="Search"
                    aria-label="Search"
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
                {/* <a className="nav-link" href="/">
									Home
								</a> */}
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
    if (this.props.isLoggedIn) {
      return (
        <React.Fragment>
          <li className="nav-item" id="Dash">
            {/* <a className="nav-link" href="#">
									Dashboard
								</a> */}
            <Link
              to="/auth/dashboard"
              className="nav-link"
              onClick={this.handelLogin}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item" id="logout">
            {/* <a className="nav-link" href="#">
									Logout
								</a> */}
            <Link to="/" className="nav-link" onClick={this.handelLogout}>
              Logout
            </Link>
          </li>
          <li className="nav-item" id="logout">
            {/* <a className="nav-link" href="#">
									History
								</a> */}
            <Link
              to="/auth/history"
              className="nav-link"
              onClick={this.handelLogin}
            >
              History
            </Link>
          </li>
          <li className="nav-item" id="Admin">
            {/* <a className="nav-link" href="#">
									Admin
								</a> */}
            <Link
              to="/auth/admin"
              className="nav-link"
              onClick={this.handelLogin}
            >
              Admin
            </Link>
          </li>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <li className="nav-item" id="login">
            {/* <a className="nav-link" href="#">
									Log In
								</a> */}
            <Link
              to="/auth/login"
              className="nav-link"
              onClick={this.handelLogin}
            >
              Login
            </Link>
          </li>
          <li className="nav-item" id="signup">
            {/* <a className="nav-link" href="#">
									Sign Up
								</a> */}
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

  handelLogin = () => {
    console.log("here");
  };
  handelLogout = () => {
    this.props.handelIsLoggedIn(false);
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
