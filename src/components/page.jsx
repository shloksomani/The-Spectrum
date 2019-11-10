import React, { Component } from "react";
import TopNavbar from "./topNavbar";
import BiasNavbar from "./biasNavbar";
import Container from "./container";
import parsed_data from "../data";
export class Page extends Component {
	state = {
		data: [],
		bias: ""
	};

	componentDidMount() {
		this.getData();
	}

	render() {
		return (
			//
			<React.Fragment>
				<TopNavbar></TopNavbar>
				<BiasNavbar
					bias={this.state.bias}
					setterParent={this.handleBias}
				></BiasNavbar>

				{this.state.data.length > 0 &&
					this.state.data.map((article, index) => {
						return <Container key={index} news={article}></Container>;
					})}
			</React.Fragment>
		);
	}

	getData = () => {
		const data = {};
		data.dummy_data = [];
		console.log("here");
		if (this.state.bias === "") {
			for (let bias in parsed_data) {
				// List of articles that have the bias
				const bias_list = parsed_data[bias];
				for (let i = 0; i < 2; i++) {
					// each article in the article list
					const article = bias_list[i];
					data.dummy_data.push(article);
				}
			}
			// for each bias
			this.setState({ data: data.dummy_data });
		} else {
			console.log(this.state.bias);
		}
	};

	handleBias = biasGet => {
		let i = biasGet.toLowerCase().split(" ");
		let k = i.join("_");
		console.log(k);

		this.setState({ bias: biasGet }, this.setState({ data: parsed_data[k] }));
	};
}

export default Page;
