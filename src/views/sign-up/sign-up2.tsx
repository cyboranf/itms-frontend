import React from 'react';
import './sign-up.scss';
import humanLogo from '../../assets/human-logo.webp';
import logo from '../../assets/logo.webp';
import { useNavigate } from "react-router-dom";

export const SignUp2 = () => {
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
              <input type="text" id="firstName" placeholder="First name" required />
            </div>
            <div className="form-field">
              <input type="text" id="lastName" placeholder="Last name" required />
            </div>
            <div className="form-field">
              <input type="text" id="pesel" placeholder="Pesel" required />
            </div>
            <div className="form-field">
              <input type="text" id="phoneNumber" placeholder="Phone number" required />
            </div>
            <div className="form-field form-field-break"></div>
            <button onClick={() => navigate("/register")}>Back</button>
            <div className="form-field form-field-break"></div>
            <button  type="submit">Create</button>
            <div className="form-progress">2/2</div>
          </form>
        </div>
      </div>
      <div className="signin-footer">
        <img src={logo} alt="Logo" className="footer-logo" />
      </div>
    </div>
  );
};

export default SignUp2;


