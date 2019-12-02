import React, { Component } from "react";

export default class Table extends Component {
  render() {
    return (
      <div>
        <table id="userTable">
          <tbody>
            <tr>{this.getTHeads()}</tr>
          </tbody>
        </table>
      </div>
    );
  }

  getTHeads = () => {
    const head = this.props.head;
    return head.map((header, index) => {
      return <th key={index}>{header}</th>;
    });
  };
}
