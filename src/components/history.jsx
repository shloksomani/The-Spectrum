import React, { Component } from "react";
import Table from "./Table";
export class History extends Component {
  render() {
    return (
      <div>
        <h1 class="title">User History</h1>
        <div class="smth title">
          <p>Look at your media diet</p>
        </div>
        <div class="container">
          {/* <table id="userTable">
						<tbody>
							<tr>
								<th>Article Title</th>
								<th>Bias</th>
							</tr>
						</tbody>
					</table> */}
          <Table head={["Article Title", "Bias"]} />
        </div>
      </div>
    );
  }

  tableManipulation = () => {
    const userTable = document.querySelector("#userTable");

    var userCheck = "something";
    userCheck[0].history.forEach(function(article) {
      addUserToTable(article);
    });
    function addUserToTable(article) {
      const title = document.createElement("td");
      title.appendChild(document.createTextNode(article.title));
      const bold = document.createElement("strong");
      bold.appendChild(document.createTextNode(article.bias));
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
