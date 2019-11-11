import React, { Component } from "react";
import TopNavbar from "./topNavbar";
import BiasNavbar from "./biasNavbar";
import BiasPage from "./biasPage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export class Page extends Component {
	state = {
		data: [],
		bias: ""
	};

	render() {
		return (
			//
			<React.Fragment>
				<Router>
					<TopNavbar></TopNavbar>
					<BiasNavbar
						bias={this.state.bias}
						setterParent={this.handleBias}
					></BiasNavbar>

					<BiasPage bias={this.state.bias}></BiasPage>
				</Router>
			</React.Fragment>
		);
	}

	handleBias = biasGet => {
		if (biasGet === "") {
			this.setState({ bias: "" }, () => console.log(this.state));
		} else {
			let i = biasGet.toLowerCase().split(" ");
			let k = i.join("_");
			console.log(k);
			this.setState({ bias: k }, () => console.log(this.state));
		}
	};
}

export default Page;
