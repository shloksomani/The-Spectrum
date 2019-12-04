import React, { Component } from "react";
import Table from "./Table";
import axios from "axios";
export class Admin extends Component {
  state = {
    users: []
  };
  componentDidMount() {
    this.getAllUsers();
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

  render() {
    return (
      <div>
        <h1 className="title">Admin Page to manage Users</h1>
        <div className="smth title">
          <p>Remove users</p>
        </div>
        <Table head={["User Name", "Remove: id"]} />
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

  manipulateTable = () => {
    this.state.users.forEach(user => {
      this.addUserToTable(user);
    });
  };
}

export default Admin;
