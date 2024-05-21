import { useContext } from "react";
import { DataContext } from "../../context/data-context";
import { loginUser } from "../../service/auth/api";
import "./example-component.scss";

export const ExampleComponent = () => {
	const { currentUser } = useContext(DataContext);

	const loginTest = async () => {
		try {
			await loginUser({ username: "dupa", password: "cyce" });
		} catch (err: unknown) {
			console.log(err);
		}
	};

	return (
		<div className='example-component'>
			<div className='example-component__sub'>malowane jajca test</div>
			<button onClick={loginTest}>big login test</button>
			<button onClick={() => console.log(currentUser)}>show current user</button>
		</div>
	);
};
