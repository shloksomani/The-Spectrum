import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: ""
  };

  render() {
    let a = "";
    return (
      <div className="row mt-5">
        <div className="col-md-4 m-auto col-8 offset-2">
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

            <div className="form-group">
              <label>First Name</label>
              <input
                type="name"
                id="firstName"
                name="name"
                className="form-control"
                placeholder="First Name"
                onChange={event => (a = event.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="name"
                id="lastName"
                name="name"
                className="form-control"
                placeholder="Last Name"
                onChange={event =>
                  this.setState({ lastName: event.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter Email"
                onChange={event => this.setState({ email: event.target.value })}
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
                onChange={event =>
                  this.setState({ password: event.target.value })
                }
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
                onChange={event =>
                  this.setState({ password2: event.target.value })
                }
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Register
            </button>

            <p className="lead mt-4">
              Have An Account?
              <Link to="/auth/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default Signup;
