import { useNavigate } from "react-router-dom";
import { ExampleComponent } from "../../components/example";
import "./home.scss";

export const Home = () => {
	const navigate = useNavigate();
	return (
		<div>
			<ExampleComponent />
			<button onClick={() => navigate("/login")}>test to signin</button>
			<button onClick={() => navigate("/register")}>test to signup</button>
			<button onClick={() => navigate("/users")}>test admin-panel</button>
			<button onClick={() => navigate("/tasks")}>test tasks</button>
		</div>
	);
};
