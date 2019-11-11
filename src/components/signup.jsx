import React, { Component } from "react";

export class Signup extends Component {
	render() {
		return (
			<div class="row mt-5">
				<div class="col-md-4 m-auto">
					<div class="container-fluid bg-3 text-center">
						<div
							class="alert alert-warning alert-dismissible fade show"
							role="alert"
						></div>
					</div>
					<div class="card card-body">
						<h1 class="text-center mb-3">
							<i class="fas fa-user-plus"></i> Register
						</h1>

						<form action="/signup" method="POST">
							<div class="form-group">
								<label for="name">Name</label>
								<input
									type="name"
									id="name"
									name="name"
									class="form-control"
									placeholder="Enter Name"
									value=""
									required
								/>
							</div>
							<div class="form-group">
								<label for="email">Email</label>
								<input
									type=""
									id="email"
									name="email"
									class="form-control"
									placeholder="Enter Email"
									value=""
									required
								/>
							</div>
							<div class="form-group">
								<label for="password">Password</label>
								<input
									type="password"
									id="password"
									name="password"
									class="form-control"
									placeholder="Create Password"
									value=""
									required
								/>
							</div>
							<div class="form-group">
								<label for="password2">Confirm Password</label>
								<input
									type="password"
									id="password2"
									name="password2"
									class="form-control"
									placeholder="Confirm Password"
									value=""
									required
								/>
							</div>
							<button type="submit" class="btn btn-primary btn-block">
								Register
							</button>
						</form>
						<p class="lead mt-4">
							Have An Account? <a href="/login">Login</a>
						</p>
					</div>
				</div>
			</div>
		);
	}
}
export default Signup;
