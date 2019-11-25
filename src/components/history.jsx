import React, { Component } from "react";
import Table from "./Table";
import axios from "axios";
export class History extends Component {
  state = { history: null };

  componentDidMount() {
    if (this.props.users.length > 0) {
      this.getUser();
    }
  }

  getUser = () => {
    console.log("inside getUser History");

    axios.get("/user/history").then(res => {
      if (res.status === 200) {
        console.log(res.data.history);
        this.setState({ history: res.data.history });
        console.log(this.state);
        this.tableManipulation();
      }
    });
  };

  render() {
    return (
      <div>
        <h1 className="title">User History</h1>
        <div className="smth title">
          <p>Look at your media diet</p>
        </div>
        <div className="container">
          <Table head={["Article Title", "Bias"]} />
        </div>
      </div>
    );
  }

  tableManipulation = () => {
    const userTable = document.querySelector("#userTable");
    console.log("logging history in tableManipulation");

    console.log(this.state.history);

    if (this.state.history) {
      this.state.history.forEach(function(article) {
        addUserToTable(article);
      });
    }

    function addUserToTable(article) {
      const title = document.createElement("td");
      title.appendChild(document.createTextNode(article.article.title));
      const bold = document.createElement("strong");
      bold.appendChild(document.createTextNode(article.article.bias));
      const bias = document.createElement("td");
      bias.appendChild(bold);
      // const action = document.createElement("td")
      // action.innerHTML = "<form action=\"/admin\" method=\"POST\"> <input class= \"return\" name=\"id\" value =\"remove: "+user.id+ "\" type=\"submit\"> </form>"
      const row = document.createElement("tr");
      row.appendChild(title);
      row.appendChild(bias);
      const tablebody = userTable.querySelector("tbody");
      tablebody.appendChild(row);
    }
  };
}

export default History;
