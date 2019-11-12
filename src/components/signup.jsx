import React, { Component } from "react";

export class Signup extends Component {
	render() {
		return (
			<div className="row mt-5">
				<div className="col-md-4 m-auto">
					{/* <div className="container-fluid bg-3 text-center">
						<div
							className="alert alert-warning alert-dismissible fade show"
							role="alert"
						></div>
					</div> */}
					<div className="card card-body">
						<h1 className="text-center mb-3">
							<i className="fas fa-user-plus"></i> Register
						</h1>

						<form action="/signup" method="POST">
							<div className="form-group">
								<label>Name</label>
								<input
									type="name"
									id="name"
									name="name"
									className="form-control"
									placeholder="Enter Name"
									value=""
									required
								/>
							</div>
							<div className="form-group">
								<label>Email</label>
								<input
									type=""
									id="email"
									name="email"
									className="form-control"
									placeholder="Enter Email"
									value=""
									required
								/>
							</div>
							<div className="form-group">
								<label>Password</label>
								<input
									type="password"
									id="password"
									name="password"
									className="form-control"
									placeholder="Create Password"
									value=""
									required
								/>
							</div>
							<div className="form-group">
								<label>Confirm Password</label>
								<input
									type="password"
									id="password2"
									name="password2"
									className="form-control"
									placeholder="Confirm Password"
									value=""
									required
								/>
							</div>
							<button type="submit" className="btn btn-primary btn-block">
								Register
							</button>
						</form>
						<p className="lead mt-4">
							Have An Account? <a href="auth/login">Login</a>
						</p>
					</div>
				</div>
			</div>
		);
	}
}
export default Signup;
