import React, { Component } from "react";
import TopNavbar from "./topNavbar";
import BiasNavbar from "./biasNavbar";
import BiasPage from "./biasPage";
import Home from "./home";
import Login from "./login";
import Signup from "./signup";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export class Page extends Component {
  state = {
    bias: "",
    isLoggedIn: false
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <TopNavbar
            bias={this.state.bias}
            setterParent={this.handleBias}
          ></TopNavbar>
          <BiasNavbar
            bias={this.state.bias}
            setterParent={this.handleBias}
          ></BiasNavbar>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route
              exact
              path="/:id"
              render={props => <BiasPage {...props} bias={this.state.bias} />}
            />
            <Route exact path="/auth/login">
              <Login isLoggedIn={this.state.isLoggedIn} />
            </Route>
            <Route exact path="/auth/signup">
              <Signup isLoggedIn={this.state.isLoggedIn} />
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }

  // This will be in BiasPage
  // shuffleArray(array) {
  // 	for (var i = array.length - 1; i > 0; i--) {
  // 		var j = Math.floor(Math.random() * (i + 1));
  // 		var temp = array[i];
  // 		array[i] = array[j];
  // 		array[j] = temp;
  // 	}
  // }

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
}

export default Page;
