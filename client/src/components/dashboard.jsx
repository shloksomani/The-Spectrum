import React, { Component } from "react";
import PieChart from "./pieChart";
import axios from "axios";
export class Dashboard extends Component {
  state = { history: null, rerender: null };

  componentDidMount() {
    //if (this.props.users.length > 0) {
    this.getUser();
    //}
  }

  getUser = () => {
    console.log("inside getUser History");

    axios.get("/user/history").then(res => {
      if (res.status === 200) {
        console.log(res.data.history);
        this.setState({ history: res.data.history });
        console.log(this.state);
      }
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="dropdown d-flex justify-content-center filter-dash">
          <h4 className="d-inline-block align-middle heading dash" id="dash">
            User's Media Consumption Diet
          </h4>
          <button
            className="btn  dropdown-toggle smth dash"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Choose First
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button className="dropdown-item" id="today" type="button">
              Today
            </button>
            <button className="dropdown-item" id="thisWeek" type="button">
              This Week
            </button>
            <button className="dropdown-item" id="thisMonth" type="button">
              This Month
            </button>
            <button className="dropdown-item" id="eternity" type="button">
              Eternity
            </button>
          </div>
        </div>
        {this.getChart()}
        {/* <canvas id="Schart" width="800" height="450"> */}

        {/* </canvas> */}

        <div className="container">
          <div className="form-group row">
            <div className="col-4 offset-4 text-center">
              <h4 className="dash">Add New News URL</h4>
              <h4 className="dash">(Subject to Admin Approval)</h4>
              <label htmlFor="urlSubmit" className="">
                Add New News URL
              </label>
              <div className="">
                <input
                  name="urlToSubmit"
                  type="text"
                  className="form-control"
                  id="urlSubmit"
                  placeholder="https://AddNewURLHere"
                  onKeyDown={this.handelSubmitLink}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
  changeState = val => {
    this.setState({ rerender: val });
  };
  getChart = () => {
    return (
      <React.Fragment>
        <PieChart history={this.state.history} changeState={this.changeState} />
      </React.Fragment>
    );
  };

  handelSubmitLink = e => {
    if (e.key === "Enter")
      axios
        .post("/user/suggested_articles", {
          link: e.target.value
        })
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            console.log("Success");
          }
        })
        .catch(error => {
          console.log("error");
        });
  };
}

export default Dashboard;
