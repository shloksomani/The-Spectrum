import React, { Component } from "react";
import Table from "./Table";
import axios from "axios";
export class Admin extends Component {
  state = {
    users: [],
    urls: []
  };
  componentDidMount() {
    this.getAllUsers();
    this.getSuggestedArticles();
  }

  getAllUsers = () => {
    axios.get("/user/all").then(response => {
      console.log("Get all users");
      console.log(response.data);
      this.setState({ users: response.data }, () => {
        this.manipulateTable();
      });
    });
  };

  getSuggestedArticles = () => {
    axios.get("/user/suggested_articles").then(response => {
      this.setState({ urls: response.data }, () => {
        this.something();
      });
    });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <h1 className="title">Admin Page to manage Users</h1>
          <div className="smth title">
            <p>Remove users</p>
          </div>
          <Table title="userTable" head={["User Name", "Remove: id"]} />
        </div>
        <div>
          <h1 className="title">User Submitted Links</h1>
          <div className="smth title">
            <p>Suggestions</p>
          </div>
          <Table title="links" head={["User Name", "Links"]} />
        </div>
      </React.Fragment>
    );
  }

  addUserToTable = user => {
    const userTable = document.querySelector("#userTable");
    if (user.username !== "admin") {
      const nameOfUser = document.createElement("td");
      nameOfUser.appendChild(document.createTextNode(user.username));
      const bold = document.createElement("strong");
      const action = document.createElement("td");
      const rem = document.createElement("button");
      const id = document.createTextNode("Remove");
      rem.appendChild(id);
      rem.classList.add(user._id);
      rem.addEventListener("click", this.removeUser);

      action.appendChild(rem);
      const row = document.createElement("tr");
      row.appendChild(nameOfUser);
      row.appendChild(action);
      const tablebody = userTable.querySelector("tbody");
      tablebody.appendChild(row);
    }
  };

  addLinksToTable = user => {
    const userTable = document.querySelector("#links");
    let newRow = userTable.insertRow(1);

    // Insert a cell in the row at index 0
    let newCell0 = newRow.insertCell(0);
    let newCell1 = newRow.insertCell(1);

    // Append a text node to the cell
    let newText0 = document.createTextNode(user.username);
    let newText1 = document.createTextNode(user.url);
    newCell0.appendChild(newText0);
    newCell1.appendChild(newText1);
  };

  removeUser = e => {
    console.log("inside removeUser");
    console.log(e.target.innerText);
    console.log(e.target.parentElement.parentElement.rowIndex);
    document
      .querySelector("#userTable")
      .deleteRow(e.target.parentElement.parentElement.rowIndex);
    axios
      .post("/user/admin", { id: e.target.classList[0] })
      .then(res => {
        console.log("post admin sucessful!");
        //  this.props.getUsers();
        this.getAllUsers();
        //this.setState({ isRemoved: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  something = () => {
    // const table = document.querySelector("#links");
    // var tableHeaderRowCount = 1;
    // var rowCount = table.rows.length;
    // for (var i = tableHeaderRowCount; i < rowCount; i++) {
    //   table.deleteRow(tableHeaderRowCount);
    // }
    this.state.urls.forEach(user => {
      this.addLinksToTable(user);
    });
  };

  manipulateTable = () => {
    const table = document.querySelector("#userTable");
    var tableHeaderRowCount = 1;
    var rowCount = table.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
      table.deleteRow(tableHeaderRowCount);
    }
    this.state.users.forEach(user => {
      this.addUserToTable(user);
    });
  };
}

export default Admin;
