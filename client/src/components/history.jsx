import React, { Component } from "react";
import Table from "./Table";
import axios from "axios";
export class History extends Component {
  state = { history: null };

  componentDidMount() {
    //if (this.props.users.length > 0) {
    this.getUser();
    //}
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
          <Table title="userTable" head={["Article Title", "Bias"]} />
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
        console.log(article.article);

        addUserToTable(article.article);
      });
    }

    function addUserToTable(article) {
      //  const title = document.createElement(
      //    "td"
      //  );
      //  title.appendChild(
      //    document.createTextNode(article.title)
      //  );
      //  const bold = document.createElement(
      //    "strong"
      //  );
      const totalBias = article.bias.split("_");
      // bold.appendChild(document.createTextNode(article.article.bias));
      //  bold.appendChild(
      //    document.createTextNode(
      //      totalBias[0] + " " + totalBias[1]
      //    )
      //  );
      //  const bias = document.createElement(
      //    "td"
      //  );
      //  bias.appendChild(bold);

      //  // const action = document.createElement("td")
      //  // action.innerHTML = "<form action=\"/admin\" method=\"POST\"> <input class= \"return\" name=\"id\" value =\"remove: "+user.id+ "\" type=\"submit\"> </form>"
      //  const row = document.createElement("tr");
      //  row.appendChild(title);
      //  row.appendChild(bias);
      const tablebody = userTable.querySelector("tbody");
      //  tablebody.appendChild(row);

      //
      let newRow = tablebody.insertRow(1);

      // Insert a cell in the row at index 0
      let newCell0 = newRow.insertCell(0);
      let newCell1 = newRow.insertCell(1);

      // Append a text node to the cell
      let newText0 = document.createTextNode(article.title);
      let newText1 = document.createTextNode(totalBias[0] + " " + totalBias[1]);
      newCell0.appendChild(newText0);
      newCell1.appendChild(newText1);
      //
    }
  };
}

export default History;
