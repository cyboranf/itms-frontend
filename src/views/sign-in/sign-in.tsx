import { useNavigate } from "react-router-dom";
import "./sign-in.scss";

export const SignIn = () => {
	const navigate = useNavigate();

	return (
		<div className='sign-in'>
			SignIn <button onClick={() => navigate("/")}>test to home</button>
		</div>
	);
};
