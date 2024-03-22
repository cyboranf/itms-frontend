import { useNavigate } from "react-router-dom";
import "./sign-in.scss";

export const SignIn = () => {
	const navigate = useNavigate()
	return (
		<div className="loginWrapper">
			<div className="login">
				<h1>Sign in</h1>
				<div className="login-input">
					<input type="text" placeholder="Username" required />
				</div>
				<div className="login-input">
					<input type="text" placeholder="Password" required />
				</div>

				<div className="remember-checkbox">
					<label>
						<input type="checkbox" /> Remember me
					</label>
					<a href="#">Forgot password?</a>
				</div>

				<button>Login</button>

				<div className="register-link">
					<p>Don't have an account? <button onClick={()=>navigate("/register")}>Register</button></p>
				</div>
			</div>
		</div>
	);
};
