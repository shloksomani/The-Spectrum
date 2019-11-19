import React, { Component } from "react";
import TopNavbar from "./topNavbar";
import BiasNavbar from "./biasNavbar";
import BiasPage from "./biasPage";
import Home from "./home";
import Login from "./login";
import Signup from "./signup";
import Admin from "./admin";
import History from "./history";
import axios from "axios";
import logo from "../assets/image/Capture1.PNG";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export class Page extends Component {
  state = {
    bias: "",
    isLoggedIn: false,
    data: [],
    username: null
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
    this.getDataFromDb();
    // this.getUser();
  }

  getDataFromDb = () => {
    axios.get("/data").then(res => {
      // this.setState({ data: res.data });
      if (res.data.user) {
        console.log("Get User: There is a user saved in the server session: ");
        this.setState({
          isLoggedIn: true,
          username: res.data.user.username,
          data: res.data.data
        });
        console.log(res.data.data);
      } else {
        console.log("Get user: no user");
        this.setState({
          data: res.data.data
        });
      }
      console.log(res);
    });
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <TopNavbar
            setterParent={this.handleBias}
            isLoggedIn={this.state.isLoggedIn}
            handelIsLoggedIn={this.handelIsLoggedIn}
          ></TopNavbar>
          <BiasNavbar setterParent={this.handleBias}></BiasNavbar>
          {this.state.bias === "" && (
            <div>
              <center>
                <img className="mainLogo" src={logo} alt="Logo"></img>
              </center>
            </div>
          )}
          <Switch>
            <Route exact path="/">
              <Home parsed_data={this.state.data} shuffle={this.shuffle} />
            </Route>
            <Route
              exact
              path="/:id"
              render={props => (
                <BiasPage
                  {...props}
                  bias={this.state.bias}
                  parsed_data={this.state.data}
                  shuffle={this.shuffle}
                />
              )}
            />
            <Route exact path="/auth/login">
              <Login
                isLoggedIn={this.state.isLoggedIn}
                handelIsLoggedIn={this.handelIsLoggedIn}
                updateUser={this.updateUser}
              />
            </Route>
            <Route exact path="/auth/signup">
              <Signup
                isLoggedIn={this.state.isLoggedIn}
                handelIsLoggedIn={this.handelIsLoggedIn}
                updateUser={this.updateUser}
              />
            </Route>
            <Route exact path="/auth/admin">
              <Admin />
            </Route>
            <Route exact path="/auth/history">
              <History />
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }

  handleBias = biasGet => {
    if (biasGet === "") {
      this.setState({ bias: "" }, () => console.log(this.state));
    } else {
      let i = biasGet.toLowerCase().split(" ");
      let k = i.join("_");
      console.log(k);
      this.setState({ bias: k }, () => console.log(this.state));
    }
  };

  handelIsLoggedIn = (bool, username) => {
    this.setState({ isLoggedIn: bool, username: username });
  };
}

export default Page;
