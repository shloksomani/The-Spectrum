import React, { Component } from "react";
import TopNavbar from "./topNavbar";
import BiasNavbar from "./biasNavbar";
import Container from "./container";

export class Page extends Component {
	render() {
		return (
			<React.Fragment>
				<TopNavbar></TopNavbar>
				<BiasNavbar></BiasNavbar>
				<Container></Container>
			</React.Fragment>
		);
	}
}

export default Page;
