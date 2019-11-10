import React, { Component } from "react";
import TopNavbar from "./topNavbar";
import BiasNavbar from "./biasNavbar";

export class Page extends Component {
	render() {
		return (
			<React.Fragment>
				<TopNavbar></TopNavbar>
				<BiasNavbar></BiasNavbar>
			</React.Fragment>
		);
	}
}

export default Page;
