import React, { Component } from "react";

export class Admin extends Component {
	render() {
		return (
			<div>
				<h1 class="title">Admin Page to manage Users</h1>
				<div class="smth title">
					<p>Admin is allowed to remove users</p>
				</div>
				<table id="userTable">
					<tbody>
						<tr>
							<th>User Name</th>
							<th>Email</th>
							<th>Action: id</th>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	manipulateTable = () => {
		const userTable = document.querySelector("#userTable");
		var userCheck = "something";
		userCheck.forEach(function(user) {
			addUserToTable(user);
		});
		function addUserToTable(user) {
			const nameOfUser = document.createElement("td");
			nameOfUser.appendChild(document.createTextNode(user.name));
			const bold = document.createElement("strong");
			bold.appendChild(document.createTextNode(user.email));
			const email = document.createElement("td");
			email.appendChild(bold);
			const action = document.createElement("td");
			action.innerHTML =
				'<form action="/admin" method="POST"> <input class= "return" name="id" value ="remove: ' +
				user.id +
				'" type="submit"> </form>';
			const row = document.createElement("tr");
			row.appendChild(nameOfUser);
			row.appendChild(email);
			row.appendChild(action);
			tablebody = userTable.querySelector("tbody");
			tablebody.appendChild(row);
		}
	};
}

export default Admin;
