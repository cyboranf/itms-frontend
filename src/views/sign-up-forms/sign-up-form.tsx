import "./sign-up-form.scss";
import Select from "react-select";
import { useState } from "react";
import Input from "../../components/input/input";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { RegexpValidators } from "../../utils/reg-exp";
import { RegisterValuesTypes } from "../../service/auth/types";
import { SetStateAction } from "react";
import { Controller, Control } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

type SignUpFormProps = {
	register: UseFormRegister<RegisterValuesTypes>;
	setValue: UseFormSetValue<RegisterValuesTypes>;
	errors: FieldErrors<RegisterValuesTypes>;
	passwordValue: string;
	trigger: UseFormTrigger<RegisterValuesTypes>;
	setCurrentStep: React.Dispatch<SetStateAction<number>>;
	control: Control<RegisterValuesTypes>;
	watch: any;
	isSubmitted: boolean;
};

export const SignUpForm: React.FC<SignUpFormProps> = ({
														  register,
														  errors,
														  roleOptions,
														  passwordValue,
														  setCurrentStep,
														  trigger,
														  control,
													  }) => {
	const navigate = useNavigate();
	const [wasSubmitted, setWasSubmitted] = useState(false);

	const validateAndGoNext = async () => {
		const isFirstStepValid = await trigger(["username", "email", "password", "confirm_password", "role"]);

		console.log(errors);

		if (isFirstStepValid) {
			setCurrentStep(1);
		}
	};

	return (
		<div className='signin-form-container'>
			<div className='signin-form'>
				<h1>Create account</h1>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						validateAndGoNext();
					}}
				>
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
						placeholder='Email'
						register={register("email", {
							pattern: {
								value: RegexpValidators.EMAIL,
								message: "Wrong email format",
							},
							required: "Required",
						})}
						error={errors}
					/>
					<Input
						type='password'
						placeholder='Password'
						register={register("password", {
							validate: {
								digits: (value) => RegexpValidators.PASSWORD_NUMBER.test(value) || "Must contain at least one digit",
								specialChar: (value) =>
									RegexpValidators.SPECIAL_CHARACTERS.test(value) || "Must contain at least one special character",
							},
							required: "Required",
						})}
						error={errors}
					/>

					<Input
						type='password'
						placeholder='Confirm Password'
						register={register("confirm_password", {
							validate: (value) => {
								if (passwordValue !== value) {
									return "Passwords must match";
								}
							},
							required: "Required",
						})}
						error={errors}
					/>



					<div className='form-field form-field-break'></div>
					<button
						onClick={(e) => {
							e.preventDefault();
							setWasSubmitted(true);
							validateAndGoNext();
						}}
					>
						Next
					</button>
					<div className='form-progress'>1/2</div>
				</form>
				<div className='login-link'>
					<Link to='/login'>Already have an account?</Link>
				</div>
			</div>
		</div>
	);
};

export default SignUpForm;
