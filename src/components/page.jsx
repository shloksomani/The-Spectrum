import React, { Component } from "react";
import TopNavbar from "./topNavbar";
import BiasNavbar from "./biasNavbar";
import BiasPage from "./biasPage";
import Home from "./home";
import Login from "./login";
import Signup from "./signup";
import Admin from "./admin";
import History from "./history";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export class Page extends Component {
  state = {
    bias: "",
    isLoggedIn: false,
    data: []
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
  }

  getDataFromDb = () => {
    fetch("http://localhost:5000")
      .then(data => data.json())
      .then(res => {
        this.setState({ data: res });
        // console.log(this.state.data);
      });
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <TopNavbar
            bias={this.state.bias}
            setterParent={this.handleBias}
            isLoggedIn={this.state.isLoggedIn}
            handelIsLoggedIn={this.handelIsLoggedIn}
          ></TopNavbar>
          <BiasNavbar
            bias={this.state.bias}
            setterParent={this.handleBias}
          ></BiasNavbar>
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
              />
            </Route>
            <Route exact path="/auth/signup">
              <Signup
                isLoggedIn={this.state.isLoggedIn}
                handelIsLoggedIn={this.handelIsLoggedIn}
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

  handelIsLoggedIn = bool => {
    this.setState({ isLoggedIn: bool });
  };
}

export default Page;
