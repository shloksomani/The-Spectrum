import React from "react";
import Page from "./components/page";
import axios from "axios";
class App extends React.Component {
  state = {
    data: [],
    bias: "",
    redirect: false
  };
  componentDidMount() {
    this.getDataFromDb();
  }

  // getDataFromDb = () => {
  //   const dataDB = {};
  //   const request = axios
  //     .get("/data", {
  //       params: {
  //         name: this.state.bias
  //       }
  //     })
  //     .then(res => {
  //       console.log("got response in getDB");

  //       console.log(res);

  //       if (res.data.user) {
  //         console.log(
  //           "Get User: There is a user saved in the server session: "
  //         );
  //         // this.setState({
  //         //   isLoggedIn: true,
  //         //   username: res.data.user.username,
  //         //   data: res.data.data
  //         // });
  //       } else {
  //         // this.setState({
  //         //   data: res.data.data
  //         // });
  //         // console.log(this.setState);
  //         dataDB.left_bias = res.data.data;
  //         axios
  //           .get("/data", {
  //             params: {
  //               name: this.state.bias
  //             }
  //           })
  //           .then(res => {
  //             console.log("got response in getDB");

  //             console.log(res);

  //             if (res.data.user) {
  //               console.log(
  //                 "Get User: There is a user saved in the server session: "
  //               );
  //               // this.setState({
  //               //   isLoggedIn: true,
  //               //   username: res.data.user.username,
  //               //   data: res.data.data
  //               // });
  //             } else {
  //               dataDB.least_bias = res.data.data;
  //               // axios
  //               //   .get("/data/right_center", {
  //               //     params: {
  //               //       name: this.state.bias
  //               //     }
  //               //   })
  //               //   .then(res => {
  //               //     console.log("got response in getDB");

  //               //     console.log(res);

  //               //     if (res.data.user) {
  //               //       console.log(
  //               //         "Get User: There is a user saved in the server session: "
  //               //       );
  //               //       // this.setState({
  //               //       //   isLoggedIn: true,
  //               //       //   username: res.data.user.username,
  //               //       //   data: res.data.data
  //               //       // });
  //               //     } else {
  //               //       // this.setState({
  //               //       //   data: res.data.data
  //               //       // });
  //               //       // console.log(this.setState);
  //               //       dataDB.right_center = res.data.data;
  //               //       axios
  //               //         .get("/data/left_center", {
  //               //           params: {
  //               //             name: this.state.bias
  //               //           }
  //               //         })
  //               //         .then(res => {
  //               //           console.log("got response in getDB");

  //               //           console.log(res);

  //               //           if (res.data.user) {
  //               //             console.log(
  //               //               "Get User: There is a user saved in the server session: "
  //               //             );
  //               //             // this.setState({
  //               //             //   isLoggedIn: true,
  //               //             //   username: res.data.user.username,
  //               //             //   data: res.data.data
  //               //             // });
  //               //           } else {
  //               //             // this.setState({
  //               //             //   data: res.data.data
  //               //             // });
  //               //             // console.log(this.setState);
  //               //             dataDB.left_center = res.data.data;
  //               //             this.setState({ data: dataDB });
  //               //             console.log(this.state);
  //               //           }
  //               //         })
  //               //         .catch(err => {
  //               //           console.log("error in fetching data from server");
  //               //           console.log(err);
  //               //         });
  //                   }
  //                 })
  //                 .catch(err => {
  //                   console.log("error in fetching data from server");
  //                   console.log(err);
  //                 });
  //             }
  //           })
  //           .catch(err => {
  //             console.log("error in fetching data from server");
  //             console.log(err);
  //           });
  //       }
  //     })
  //     .catch(err => {
  //       console.log("error in fetching data from server");
  //       console.log(err);
  //     });
  // };

  getDataFromDb = () => {
    const request = axios
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

  render() {
    return (
      <Page
        data={this.state.data}
        handleBias={this.handleBias}
        bias={this.state.bias}
        getArticles={this.getDataFromDb}
        redirect={this.state.redirect}
        setRedirect={this.setRedirect}
      ></Page>
    );
  }
}

export default App;
