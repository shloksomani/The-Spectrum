import React, { Component } from "react";
import {
	Navbar,
	Nav,
	NavDropdown,
	Form,
	Button,
	FormControl
} from "react-bootstrap";

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
								<a className="nav-link LeftB" href="#">
									Left Bias
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link LCB" href="#">
									Left-Center Bias
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link LeastB" href="#">
									Least Biased
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link RCB" href="#">
									Right-Center Bias
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link RB" href="#">
									Right Bias
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link PS" href="#">
									Pro-Science
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link QS" href="#">
									Questionable Sources
								</a>
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
}

export default BiasNavbar;
