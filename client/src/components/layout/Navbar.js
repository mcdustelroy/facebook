import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import ProfileContext from "../../context/profile/profileContext";
import UsersContext from "../../context/users/usersContext";


const Navbar = () => {
	const authContext = useContext(AuthContext);

	const { isAuthenticated, logout, user } = authContext;
	const { clearUserState } = UsersContext;
	const { clearProfileState } = ProfileContext;
	
	
	const onLogout = () => {
		logout()
		clearUserState()
		clearProfileState()
	}

	const authLinks = (
		<Fragment>
			<li>
				<Link to="/" onClick={() => clearProfileState()} >Home</Link>
			</li>
			<li>			
				<Link to="/login" onClick={onLogout}>
					Logout
				</Link>	
			</li>
		</Fragment>
	)

	const guestLinks = (
		<Fragment>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</Fragment>
	)

	return (
		<div className="navbar bg-dark">
			<h1>
				<i className='fas fa-id-card-alt' /> Facebook
			</h1>

			{isAuthenticated && 
			<ul>
				<Fragment>
					<li>
						Hello { (user && user.info && user.info.name) || (user && user.name) }
					</li>
				</Fragment>
			</ul>}
			<ul>
				{isAuthenticated ? authLinks : guestLinks}
			</ul>
		</div>
	);
};

export default Navbar;

