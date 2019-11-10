import React, { Component } from "react";
import { Media } from "react-bootstrap";

class Container extends Component {
	render() {
		return (
			<div>
				<div className="col-10 offset-1 d-flex align-items-stretch">
					<div
						className="row no-gutters bg-light position-relative mt-4"
						id="firstNews"
					>
						<div className="col-md-4 mb-md-0 p-md-4">
							<img
								src="https://images.unsplash.com/photo-1534598974068-2d51eda7628f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
								className="w-100 rounded"
								alt=""
							/>
						</div>
						<div className="col-md-8 position-relative p-4 pl-md-0">
							<h5 id="newsTitle" className="mt-0">
								Democracy is Dead
							</h5>
							<p
								href="url"
								className="stretched-link"
								style={{ position: "relative" }}
							>
								Summary:
							</p>
							<div>
								<strong>Bias: 'Left Bias'</strong>
							</div>
							<div>
								<a
									href="url"
									className="stretched-link check history"
									style={{ position: "relative" }}
								>
									Link to news
								</a>

								<p style={{ transform: "rotate(0)" }}>
									<a href="+ mbfc + " className="text-warning stretched-link">
										{" "}
										Bias Breakdown
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Container;
