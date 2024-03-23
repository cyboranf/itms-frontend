import "./sign-in.scss";
import humanLogo from "../../assets/human-logo.webp";
import logo from "../../assets/logo.webp";
import { useForm } from "react-hook-form";
import Input from "../../components/input/input";
import { loginUser } from "../../service/auth";
import { RegexpValidators } from "../../utils/reg-exp";

export type LoginValuesType = {
	username: string;
	password: string;
};

export const SignIn = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginValuesType>();

	const onSubmit = async ({ username, password }: LoginValuesType) => {
		console.log(username, password);
		try {
			const res = await loginUser({ username, password });
			console.log(res);
		} catch (err: unknown) {
			console.log(err);
		}
	};

	return (
		<div className='signin-container'>
			<div className='signin-logo'>
				<img src={humanLogo} alt='Human Logo' />
			</div>
			<div className='signin-form-container'>
				<div className='signin-form'>
					<h1>Sign in</h1>
					<p className='welcome-back'>Welcome back!</p>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Input
							placeholder='Username'
							register={register("username", {
								minLength: 3,
								maxLength: 18,
								pattern: {
									value: RegexpValidators.USERNAME_LETTERS_ONLY,
									message: "Use only letters",
								},
								required: "Required",
							})}
							error={errors}
						/>

						<Input
							placeholder='Password'
							register={register("password", {
								minLength: 5,
								maxLength: 50,
								required: "Required",
							})}
							error={errors}
						/>
						<div className='forgot-password'>
							<a href='#'>Forgot password?</a>
						</div>
						<button type='submit' className='signin-button'>
							Sign in
						</button>
					</form>
				</div>
			</div>
			<div className='signin-footer'>
				<img src={logo} alt='Logo' className='footer-logo' />
			</div>
		</div>
	);
};

export default SignIn;
