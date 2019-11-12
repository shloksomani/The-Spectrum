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
					<TopNavbar
						bias={this.state.bias}
						setterParent={this.handleBias}
					></TopNavbar>
					<BiasNavbar
						bias={this.state.bias}
						setterParent={this.handleBias}
					></BiasNavbar>
					<Route
						exact
						path="/"
						render={props => <BiasPage {...props} bias={this.state.bias} />}
					/>
					<Route
						path="/:id"
						render={props => <BiasPage {...props} bias={this.state.bias} />}
					/>
					}
				</Router>
			</React.Fragment>
		);
	}

	// This will be in BiasPage
	// shuffleArray(array) {
	// 	for (var i = array.length - 1; i > 0; i--) {
	// 		var j = Math.floor(Math.random() * (i + 1));
	// 		var temp = array[i];
	// 		array[i] = array[j];
	// 		array[j] = temp;
	// 	}
	// }

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
