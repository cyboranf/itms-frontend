import React from 'react';
import './sign-up.scss';
import humanLogo from '../../assets/human-logo.webp';
import logo from '../../assets/logo.webp';
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
	const navigate = useNavigate();
	return (
		<div className="signin-container">
			<div className="signin-logo">
				<img src={humanLogo} alt="Human Logo" />
			</div>
			<div className="signin-form-container">
				<div className="signin-form">
					<h1>Create account</h1>
					<form>
            <div className="form-field">
              <input type="text" id="username" placeholder="Username"/>
            </div>
            <div className="form-field">
              <input type="text" id="email" placeholder="Email"/>
            </div>
            <div className="form-field">
              <input type="password" id="password" placeholder="Password"/>
            </div>
            <div className="form-field">
              <input type="password" id="comfirmPassword" placeholder="Confirm Password"/>
            </div>
            <div className="form-field">
              <select required>
                <option value="" disabled selected hidden>Role</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="warehouseman">Warehouseman</option>
                <option value="printer">Printer</option>
              </select>
            </div>
            <div className="form-field form-field-break"></div>
            <button onClick={() => navigate("/register2")}>Next</button>
            <div className="form-progress">1/2</div>
          </form>
				</div>
			</div>
			<div className="signin-footer">
				<img src={logo} alt="Logo" className="footer-logo"/>
			</div>
		</div>
	);
};

export default SignUp;


