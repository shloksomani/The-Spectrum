import React, { Component } from "react";

export class Login extends Component {
	render() {
		return (
			<div class="container">
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
								<i class="fas fa-sign-in-alt"></i> Login
							</h1>
							<form action="/auth/login" method="POST">
								<div class="form-group">
									<label for="email">Email</label>
									<input
										type=""
										id="email"
										name="email"
										class="form-control"
										placeholder="Enter Email"
										required
									/>
									<small id="emailHelp" class="form-text text-muted">
										We'll never share your email with anyone else.
									</small>
								</div>
								<div class="form-group">
									<label for="password">Password</label>
									<input
										type="password"
										id="password"
										name="password"
										class="form-control"
										placeholder="Enter Password"
										required
									/>
								</div>
								<button type="submit" class="btn btn-primary btn-block">
									Login
								</button>
							</form>
							<p class="lead mt-4">
								No Account? <a href="#">Register</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
