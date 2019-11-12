import React, { Component } from "react";
import parsed_data from "../assets/data/data";
import Container from "./container";

export class BiasPage extends Component {
	render() {
		return <React.Fragment>{this.handleBias()}</React.Fragment>;
	}

	handleBias = () => {
		let v = [];

		if (this.props.bias === "") {
			v = this.getData();
			console.log("at line 15");
		} else {
			console.log("at line 17");
			v = parsed_data[this.props.bias];
		}
		return v.map((article, index) => {
			return <Container key={index} news={article}></Container>;
		});
	};

	getData = () => {
		const data1 = {};
		data1.dummy_data = [];
		for (let bias in parsed_data) {
			// List of articles that have the bias
			const bias_list = parsed_data[bias];
			for (let i = 0; i < 2; i++) {
				// each article in the article list
				const article = bias_list[i];
				data1.dummy_data.push(article);
			}
		}
		// for each bias
		return data1.dummy_data;
	};
}

export default BiasPage;
