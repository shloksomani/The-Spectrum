import React, { Component } from "react";
import TopNavbar from "./topNavbar";
import BiasNavbar from "./biasNavbar";
import BiasPage from "./biasPage";
import Home from "./home";
import Login from "./login";
import Signup from "./signup";
import Admin from "./admin";
import History from "./history";
import Dashboard from "./dashboard";
import Search from "./search";
import axios from "axios";
import logo from "../assets/image/Capture1.PNG";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

export class Page extends Component {
  state = {
    users: [],
    searchData: null
  };

  shuffle = array => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  componentDidMount() {
    // this.getAllUsers();
  }

  getAllUsers = () => {
    axios.get("/user/all").then(response => {
      console.log("Get all users");
      console.log(response.data);
      this.setState({ users: response.data });
    });
  };

  render() {
    if (this.props.redirect) {
      return (
        <React.Fragment>
          <Router>
            <TopNavbar
              setterParent={this.props.handleBias}
              isLoggedIn={this.props.isLoggedIn}
              handelIsLoggedIn={this.props.handelIsLoggedIn}
              username={this.props.username}
              isLoggedOut={this.props.isLoggedOut}
              handleIsLoggedOut={this.props.handleIsLoggedOut}
              setRedirect={this.props.setRedirect}
            ></TopNavbar>
            <BiasNavbar
              setterParent={this.props.handleBias}
              setSearchData={this.setSearchData}
            ></BiasNavbar>

            <Search
              searchData={this.state.searchData}
              parsed_data={this.props.data}
              shuffle={this.shuffle}
              isLoggedIn={this.props.isLoggedIn}
            />
          </Router>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Router>
            <TopNavbar
              setterParent={this.props.handleBias}
              isLoggedIn={this.props.isLoggedIn}
              handelIsLoggedIn={this.props.handelIsLoggedIn}
              username={this.props.username}
              isLoggedOut={this.props.isLoggedOut}
              handleIsLoggedOut={this.props.handleIsLoggedOut}
              setRedirect={this.props.setRedirect}
            ></TopNavbar>
            <BiasNavbar
              setterParent={this.props.handleBias}
              setSearchData={this.setSearchData}
            ></BiasNavbar>
            {/* {this.props.bias === "" && (
              <div>
                <center>
                  <img className="mainLogo" src={logo} alt="Logo"></img>
                </center>
              </div>
            )} */}
            <Switch>
              <Route exact path="/">
                {this.props.bias === "" && (
                  <div>
                    <center>
                      <img className="mainLogo" src={logo} alt="Logo"></img>
                    </center>
                  </div>
                )}
                <Home
                  parsed_data={this.props.data}
                  shuffle={this.shuffle}
                  isLoggedIn={this.props.isLoggedIn}
                />
              </Route>
              <Route
                exact
                path="/:id"
                render={props => (
                  <BiasPage
                    {...props}
                    bias={this.props.bias}
                    parsed_data={this.props.data}
                    shuffle={this.shuffle}
                    isLoggedIn={this.props.isLoggedIn}
                  />
                )}
              />
              <Route exact path="/auth/login">
                <Login
                  isLoggedIn={this.props.isLoggedIn}
                  handelIsLoggedIn={this.props.handelIsLoggedIn}
                  updateUser={this.getUser}
                />
              </Route>
              <Route exact path="/auth/signup">
                <Signup
                  isLoggedIn={this.props.isLoggedIn}
                  handelIsLoggedIn={this.props.handelIsLoggedIn}
                />
              </Route>
              <Route exact path="/auth/admin">
                <Admin users={this.state.users} getUsers={this.getAllUsers} />
              </Route>
              <Route exact path="/auth/history">
                {this.props.isLoggedIn ? (
                  <History
                    users={this.state.users}
                    getUsers={this.getAllUsers}
                  />
                ) : (
                  <Redirect to="/auth/login"></Redirect>
                )}
              </Route>
              <Route exact path="/auth/dashboard">
                {this.props.isLoggedIn ? (
                  <Dashboard users={this.state.users} />
                ) : (
                  <Redirect to="/"></Redirect>
                )}
              </Route>
            </Switch>
          </Router>
        </React.Fragment>
      );
    }
  }

  // handelDashboardRouting = () => {
  //   if (this.state.isLoggedIn) {
  //     return <Dashboard user={this.state.users}></Dashboard>;
  //   } else {
  //     return <Redirect to="/auth/login"></Redirect>;
  //   }
  // };

  setSearchData = data => {
    console.log("inside setSearchData");

    this.setState({ searchData: data });
    this.props.setRedirect(true);
  };

  // handelIsLoggedIn = (bool, username) => {
  //   console.log(
  //     "inside handleIsLoggedIn after login calls fn, should set state"
  //   );

  //   this.setState({ isLoggedIn: bool, username: username });
  // };

  // handleIsLoggedOut = bool => {
  //   this.setState({ isLoggedOut: bool });
  // };
}

export default Page;
