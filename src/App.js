import React from "react";
import Page from "./components/page";
import axios from "axios";
class App extends React.Component {
  state = {
    data: [],
    bias: ""
  };
  componentDidMount() {
    this.getDataFromDb();
  }

  getDataFromDb = () => {
    const request = axios
      .get("/data", {
        params: {
          name: this.state.bias
        }
      })
      .then(res => {
        // this.setState({ data: res.data });
        if (res.data.user) {
          console.log(
            "Get User: There is a user saved in the server session: "
          );
          this.setState({
            isLoggedIn: true,
            username: res.data.user.username,
            data: res.data.data
          });
          // console.log(res.data.data);
        } else {
          // console.log("Get user: no user");
          this.setState({
            data: res.data.data
          });
        }
      });
    // this.getAllUsers();;
  };

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

  render() {
    return (
      <Page
        data={this.state.data}
        handleBias={this.handleBias}
        bias={this.state.bias}
        getArticles={this.getDataFromDb}
      ></Page>
    );
  }
}

export default App;
