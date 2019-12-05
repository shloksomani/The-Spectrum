import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
// import { Redirect } from "react-router";
import axios from "axios";
export class Login extends Component {
  state = {
    username: "",
    password: "",
    redirect: null,
    error: ""
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className="container mb-5">
          <div className="row mt-5">
            <div className="col-md-4 m-auto">
              {this.state.error !== "" && (
                <div
                  className="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  {this.state.error}
                </div>
              )}
              <div className="card card-body">
                <h1 className="text-center mb-3">
                  <i className="fas fa-sign-in-alt"></i> Login
                </h1>
                <form>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter Email"
                      onChange={event =>
                        this.setState({ username: event.target.value })
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
                      onChange={event =>
                        this.setState({ password: event.target.value })
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
                </form>
                <p className="lead mt-4">
                  No Account? <Link to="/auth/signup">Signup</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  handelLogin = e => {
    console.log();
    e.preventDefault();
    axios
      .post("/user/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log("login success!");
        console.log(response);
        console.log(response.data);

        if (response.status === 200) {
          // update App.js state
          // update the state to redirect to home
          console.log("status code 200");

          console.log(this.state.username);

          this.setState(
            {
              redirect: "/"
            },
            () => {
              console.log(this.state);
              this.props.handelIsLoggedIn(true, this.state.username);
            }
          );
        }
        //this.setState({ redirect: true });
      })
      .catch(error => {
        this.setState({ error: "Wrong Credentials" });
      });
  };
}
export default Login;
