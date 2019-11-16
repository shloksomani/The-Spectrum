import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    return (
      <div className="container">
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
                <i className="fas fa-sign-in-alt"></i> Login
              </h1>
              {/* <form action="/login" method="POST"> */}
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  onChange={(event, newValue) =>
                    this.setState({ username: newValue })
                  }
                  required
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                  onChange={(event, newValue) =>
                    this.setState({ password: newValue })
                  }
                  required
                />
              </div>
              <button
                type="submit"
                onClick={this.handelLogin}
                className="btn btn-primary btn-block"
              >
                Login
              </button>
              {/* </form> */}
              <p className="lead mt-4">
                No Account? <Link to="/auth/signup">Signup</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handelLogin = e => {
    this.props.handelIsLoggedIn(true);
    e.preventDefault();
    axios
      .post("http://localhost:5000/users/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log("login success!");
        console.log(response);
        //this.setState({ redirect: true });
      })
      .catch(error => {
        console.log("login error!");
        console.log(error);
      });
  };
}
export default Login;
