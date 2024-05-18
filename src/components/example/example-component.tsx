import { loginUser } from "../../service/auth/api";
import "./example-component.scss";

export const ExampleComponent = () => {
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
		</div>
	);
};
