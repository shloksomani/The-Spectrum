import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Error extends Component {
	style = {
		color: "white",
		fontSize: 30,
		height: "100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	};

	render() {
		return (
			<React.Fragment>
				<div style={this.style}>
					<p>Opps you did it again!!!!</p>
					<Link to="/">
						<button type="button">Home!</button>
					</Link>
				</div>
			</React.Fragment>
		);
	}
}

export default Error;
