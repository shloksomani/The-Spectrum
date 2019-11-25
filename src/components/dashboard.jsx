import React, { Component } from "react";

export class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="dropdown d-flex justify-content-center filter-dash">
          <h4 className="d-inline-block align-middle heading">
            User's Media Consumption Diet
          </h4>
          <button
            className="btn  dropdown-toggle smth"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Filter
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button class="dropdown-item" id="today" type="button">
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

        <canvas id="Schart" width="800" height="450"></canvas>

        <div className="container">
          <form action="/dash" method="POST" class="mt-5">
            <div className="form-group row">
              <div className="col-4 offset-4 text-center">
                <label htmlFor="urlSubmit" class="">
                  Add New News URL
                </label>
                <div className="">
                  <input
                    name="urlToSubmit"
                    type="text"
                    className="form-control"
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
