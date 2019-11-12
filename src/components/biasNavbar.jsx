import React, { Component } from "react";
import { Link } from "react-router-dom";

export class BiasNavbar extends Component {
	render() {
		return (
			<React.Fragment>
				<nav id="mediaMenu" className="navbar navbar-expand-lg navbar-light">
					<div
						className="collapse navbar-collapse navbarCombine"
						id="navbarText"
					>
						<ul className="navbar-nav mr-auto">
							<li className="nav-item">
								{/* <a
									className="nav-link LeftB"
									href="#"
									onClick={this.handelBias}
								>
									Left Bias
								</a> */}
								<Link
									to="/left_bias"
									className="nav-link"
									onClick={this.handelBias}
								>
									Left Bias
								</Link>
							</li>
							<li className="nav-item">
								{/* <a className="nav-link LCB" href="#" onClick={this.handelBias}>
									Left Center Bias
								</a> */}
								<Link
									to="/left_center_bias"
									className="nav-link"
									onClick={this.handelBias}
								>
									Left Center Bias
								</Link>
							</li>
							<li className="nav-item">
								{/* <a className="nav-link LeastB" onClick={this.handelBias}>
									Least Biased
								</a> */}
								<Link
									to="/least_bias"
									className="nav-link"
									onClick={this.handelBias}
								>
									Least Biased
								</Link>
							</li>
							<li className="nav-item">
								{/* <a className="nav-link RCB" href="#" onClick={this.handelBias}>
									Right Center Bias
								</a> */}
								<Link
									to="/right_center_bias"
									className="nav-link"
									onClick={this.handelBias}
								>
									Right Center Bias
								</Link>
							</li>
							<li className="nav-item">
								{/* <a className="nav-link RB" href="#" onClick={this.handelBias}>
									Right Bias
								</a> */}
								<Link
									to="/right_bias"
									className="nav-link"
									onClick={this.handelBias}
								>
									Right Bias
								</Link>
							</li>
							<li className="nav-item">
								{/* <a className="nav-link PS" href="#" onClick={this.handelBias}>
									Pro Science
								</a> */}
								<Link
									to="/pro_science"
									className="nav-link"
									onClick={this.handelBias}
								>
									Pro Science
								</Link>
							</li>
							<li className="nav-item">
								{/* <a className="nav-link QS" href="#" onClick={this.handelBias}>
									Questionable Sources
								</a> */}
								<Link
									to="/questionable_sources"
									className="nav-link"
									onClick={this.handelBias}
								>
									Questionable Sources
								</Link>
							</li>
						</ul>

						<span className="navbar-text d-none d-lg-block d-xl-block">
							<form
								className="form-inline"
								action="/index/keywords"
								method="GET"
							>
								<input
									className="form-control mr-sm-2"
									type="search"
									name="user_search"
									placeholder="Search"
									aria-label="Search"
								/>
								<button
									className="btn my-2 my-sm-0 searchBtnMediaMenu"
									type="submit"
								>
									Search
								</button>
							</form>
						</span>
					</div>
				</nav>
			</React.Fragment>
		);
	}

	handelBias = event => {
		this.props.setterParent(event.target.innerHTML);
	};
}

export default BiasNavbar;
