import React from "react";
import Page from "./components/page";
import axios from "axios";
class App extends React.Component {
  state = {
    data: [],
    bias: "",
    redirect: false,
    isLoggedIn: false,
    username: null,
    isLoggedOut: false
  };
  componentDidMount() {
    this.getDataFromDb();
  }
  
  getDataFromDb = () => {
    axios
      .get("/data", {
        params: {
          name: this.state.bias
        }
      })
      .then(res => {
        if (res.data.user) {
          console.log(
            "Get User: There is a user saved in the server session: "
          );
          this.setState({
            isLoggedIn: true,
            username: res.data.user.username,
            data: res.data.data
          });
        } else {
          console.log(
            "Get User: There is a no user saved in the server session: "
          );
          this.setState({
            data: res.data.data
          });
        }
      });
  };

  setRedirect = bool => {
    console.log("inside setRedirect");

    this.setState({ redirect: bool });
  };

  handleBias = biasGet => {
    if (biasGet === "") {
      this.setState({ bias: "", redirect: false }, () =>
        console.log(this.state)
      );
    } else {
      let i = biasGet.toLowerCase().split(" ");
      let k = i.join("_");
      console.log(k);
      this.setState({ bias: k, redirect: false }, () =>
        console.log(this.state)
      );
    }
  };

  handelIsLoggedIn = (bool, username) => {
    console.log(
      "inside handleIsLoggedIn after login calls fn, should set state"
    );

    this.setState({ isLoggedIn: bool, username: username });
  };

  handleIsLoggedOut = bool => {
    this.setState({ isLoggedOut: bool });
  };

  render() {
    return (
      <Page
        data={this.state.data}
        handleBias={this.handleBias}
        bias={this.state.bias}
        getArticles={this.getDataFromDb}
        redirect={this.state.redirect}
        setRedirect={this.setRedirect}
        handelIsLoggedIn={this.handelIsLoggedIn}
        handleIsLoggedOut={this.handleIsLoggedOut}
        isLoggedIn={this.state.isLoggedIn}
        isLoggedOut={this.state.isLoggedOut}
        username={this.state.username}
      ></Page>
    );
  }
}

export default App;
