import React, { Component } from "react";

export class Dashboard extends Component {
	render() {
		return (
			<React.Fragment>
				<div class="dropdown d-flex justify-content-center filter-dash">
					<h4 class="d-inline-block align-middle heading">
						User's Media Consumption Diet
					</h4>
					<button
						class="btn  dropdown-toggle smth"
						type="button"
						id="dropdownMenu2"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						Filter
					</button>
					<div class="dropdown-menu" aria-labelledby="dropdownMenu2">
						<button class="dropdown-item" id="today" type="button">
							Today
						</button>
						<button class="dropdown-item" id="thisWeek" type="button">
							This Week
						</button>
						<button class="dropdown-item" id="thisMonth" type="button">
							This Month
						</button>
						<button class="dropdown-item" id="eternity" type="button">
							Eternity
						</button>
					</div>
				</div>

				<canvas id="Schart" width="800" height="450"></canvas>

				<div class="container">
					<form action="/dash" method="POST" class="mt-5">
						<div class="form-group row">
							<div class="col-4 offset-4 text-center">
								<label for="urlSubmit" class="">
									Add New News URL
								</label>
								<div class="">
									<input
										name="urlToSubmit"
										type="text"
										class="form-control"
										id="urlSubmit"
										placeholder="https://gocrazy"
									/>
								</div>
							</div>
						</div>
					</form>
				</div>
			</React.Fragment>
		);
	}
}

export default Dashboard;
