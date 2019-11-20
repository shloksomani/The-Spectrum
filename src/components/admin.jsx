import React, { Component } from "react";
import Table from "./Table";
export class Admin extends Component {
  componentDidMount() {
    if (this.props.users.length > 0) {
      this.manipulateTable();
    }
  }
  render() {
    return (
      <div>
        <h1 class="title">Admin Page to manage Users</h1>
        <div class="smth title">
          <p>Admin is allowed to remove users</p>
        </div>
        {/* <Table head={["User Name", "Email", "Action: id"]} /> */}
        <Table head={["User Name", "Action: id"]} />
      </div>
    );
  }

  manipulateTable = () => {
    const userTable = document.querySelector("#userTable");
    var userCheck = "something";
    this.props.users.forEach(function(user) {
      addUserToTable(user);
    });
    function addUserToTable(user) {
      const nameOfUser = document.createElement("td");
      nameOfUser.appendChild(document.createTextNode(user.username));
      const bold = document.createElement("strong");
      // bold.appendChild(document.createTextNode(user.email));
      // const email = document.createElement("td");
      // email.appendChild(bold);
      const action = document.createElement("td");
      action.innerHTML =
        '<form action="/admin" method="POST"> <input class= "return" name="id" value ="remove: ' +
        user._id +
        '" type="submit"> </form>';
      const row = document.createElement("tr");
      row.appendChild(nameOfUser);
      //row.appendChild(email);
      row.appendChild(action);
      const tablebody = userTable.querySelector("tbody");
      tablebody.appendChild(row);
    }
  };
}

export default Admin;
