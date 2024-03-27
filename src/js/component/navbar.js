import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3 bg-black">
			<Link to="/">
				<span className="navbar-brand mb-0 h1"></span>
			</Link>
			 <div className="ml-auto">
				<Link to="/demo">
					<button className="btn btn-success m-4">Add New Contact</button>
				</Link> 
			</div> 
		</nav>
	);
};