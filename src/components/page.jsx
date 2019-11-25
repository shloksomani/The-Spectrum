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
import axios from "axios";
import logo from "../assets/image/Capture1.PNG";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
//import { browserHistory } from "react-router";
export class Page extends Component {
  state = {
    isLoggedIn: false,
    username: null,
    users: [],
    isLoggedOut: false
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
    this.getAllUsers();
  }

  getAllUsers = () => {
    axios.get("/user/all").then(response => {
      console.log("Get all users");
      console.log(response.data);
      this.setState({ users: response.data });
    });
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <TopNavbar
            setterParent={this.props.handleBias}
            isLoggedIn={this.state.isLoggedIn}
            handelIsLoggedIn={this.handelIsLoggedIn}
            username={this.state.username}
            isLoggedOut={this.state.isLoggedOut}
            handleIsLoggedOut={this.handleIsLoggedOut}
          ></TopNavbar>
          <BiasNavbar setterParent={this.props.handleBias}></BiasNavbar>
          {this.props.bias === "" && (
            <div>
              <center>
                <img className="mainLogo" src={logo} alt="Logo"></img>
              </center>
            </div>
          )}
          <Switch>
            <Route exact path="/">
              <Home parsed_data={this.props.data} shuffle={this.shuffle} />
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
                />
              )}
            />
            <Route exact path="/auth/login">
              <Login
                isLoggedIn={this.state.isLoggedIn}
                handelIsLoggedIn={this.handelIsLoggedIn}
                updateUser={this.getUser}
              />
            </Route>
            <Route exact path="/auth/signup">
              <Signup
                isLoggedIn={this.state.isLoggedIn}
                handelIsLoggedIn={this.handelIsLoggedIn}
              />
            </Route>
            <Route exact path="/auth/admin">
              <Admin users={this.state.users} getUsers={this.getAllUsers} />
            </Route>
            <Route exact path="/auth/history">
              {this.state.isLoggedIn ? (
                <History users={this.state.users} />
              ) : (
                <Redirect to="/auth/login"></Redirect>
              )}
            </Route>
            <Route exact path="/auth/dashboard">
              {this.state.isLoggedIn ? (
                <Dashboard users={this.state.users} />
              ) : (
                <Redirect to="/auth/login"></Redirect>
              )}
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }

  // handleBias = biasGet => {
  //   if (biasGet === "") {
  //     this.setState({ bias: "" }, () => console.log(this.state));
  //   } else {
  //     let i = biasGet.toLowerCase().split(" ");
  //     let k = i.join("_");
  //     console.log(k);
  //     this.setState({ bias: k }, () => console.log(this.state));
  //   }
  // };

  handelIsLoggedIn = (bool, username) => {
    console.log(
      "inside handleIsLoggedIn after login calls fn, should set state"
    );

    this.setState({ isLoggedIn: bool, username: username });
  };

  handleIsLoggedOut = bool => {
    this.setState({ isLoggedOut: bool });
  };
}

export default Page;
