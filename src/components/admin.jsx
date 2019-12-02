import React, { Component } from "react";
import Table from "./Table";
import axios from "axios";
export class Admin extends Component {
  
  //Once table is created in DOM
  componentDidMount() {
    if (this.props.users.length > 0) {
      this.manipulateTable();
      this.props.getUsers();
    }
  }

  render() {
    return (
      <div>
        <h1 className="title">Admin Page to manage Users</h1>
        <div className="smth title">
          <p>Admin is allowed to remove users</p>
        </div>
        <Table head={["User Name", "Remove User"]} />
      </div>
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

  removeUser = e => {
    document
      .querySelector("#userTable")
      .deleteRow(e.target.parentElement.parentElement.rowIndex);
    axios
      .post("/user/admin", { id: e.target.classList[0] })
      .then(res => {
        console.log("post admin sucessful!");
        this.props.getUsers();
      })
      .catch(err => {
        console.log(err);
      });
  };

  //adds users to tables
  manipulateTable = () => {
    this.props.users.forEach(user => {
      this.addUserToTable(user);
    });
  };
}

export default Admin;
