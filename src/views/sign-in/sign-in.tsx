import React from 'react';
import './sign-in.scss';
import humanLogo from '../../assets/human-logo.webp';
import logo from '../../assets/logo.webp';
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
	const navigate = useNavigate();
	return (
		<div className="signin-container">
			<div className="signin-logo">
				<img src={humanLogo} alt="Human Logo" />
			</div>
			<div className="signin-form-container">
				<div className="signin-form">
					<h1>Sign in</h1>
					<p className="welcome-back">Welcome back!</p>
					<form>
						<div className="form-field">
							<input type="text" id="username" placeholder="Username" />
						</div>
						<div className="form-field">
							<input type="password" id="password" placeholder="Password" />
						</div>
						<div className="forgot-password">
							<a href="#">Forgot password?</a>
						</div>
						<button type="submit" className="signin-button">Sign in</button>
					</form>
				</div>
			</div>
			<div className="signin-footer">
				<img src={logo} alt="Logo" className="footer-logo"/>
			</div>
		</div>
	);
};

export default SignIn;


