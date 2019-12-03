import React, { Component } from "react";
import PieChart from "./pieChart";
export class Dashboard extends Component {
  state = { rerender: null };
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
            Filter
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
          <form action="/dash" method="POST" className="mt-5">
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
                  />
                </div>
              </div>
            </div>
          </form>
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
        {" "}
        <PieChart changeState={this.changeState} />{" "}
      </React.Fragment>
    );
  };
}

export default Dashboard;
