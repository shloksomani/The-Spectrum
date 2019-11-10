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
			<Navbar bg="" expand="lg" className="navbar" id="bias-header">
				<Navbar.Toggle aria-controls="basic-navbar-nav " id="header" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link href="#home">Left Bias</Nav.Link>
						<Nav.Link href="#link">Left-Center Bias</Nav.Link>
						<Nav.Link href="#link">Least Bias</Nav.Link>
						<Nav.Link href="#link">Right-Center Bias</Nav.Link>
						<Nav.Link href="#link">Right Bias</Nav.Link>
						<Nav.Link href="#link">Questionable Bias</Nav.Link>
						<Nav.Link href="#link">Pro-Science Bias</Nav.Link>
					</Nav>
					<Form inline>
						<FormControl type="text" placeholder="Search" className="mr-sm-2" />
						<Button variant="outline-success">Search</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default BiasNavbar;
