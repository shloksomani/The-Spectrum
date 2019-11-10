import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";

export class TopNavbar extends Component {
	render() {
		return (
			<Navbar bg="" expand="lg" className="navbar" id="topheader">
				<Navbar.Brand href="#home" className="navbar-brand">
					The Spectrum
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav " id="header-toggle" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						<Nav.Link href="#home">Home</Nav.Link>
						<Nav.Link href="#link">Dash</Nav.Link>
						<Nav.Link href="#link">Logout</Nav.Link>
						<Nav.Link href="#link">Admin</Nav.Link>
						<Nav.Link href="#link">Login</Nav.Link>
						<Nav.Link href="#link">Signup</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default TopNavbar;
