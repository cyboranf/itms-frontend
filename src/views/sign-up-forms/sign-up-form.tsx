import "./sign-up-form.scss";
import Select from "react-select";
import Input from "../../components/input/input";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { RegexpValidators } from "../../utils/reg-exp";
import { RegisterValuesTypes } from "../../service/auth/types";
import { SetStateAction } from "react";
import { Controller } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

type SignUpFormProps = {
	register: UseFormRegister<RegisterValuesTypes>;
	setValue: UseFormSetValue<RegisterValuesTypes>;
	errors: FieldErrors<RegisterValuesTypes>;
	roleOptions: { value: string; label: string }[];
	setCurrentStep: React.Dispatch<SetStateAction<number>>;
	passwordValue: string;
	trigger: UseFormTrigger<FieldErrors>;
};

export const SignUpForm: React.FC<SignUpFormProps> = ({
	register,
	errors,
	setValue,
	roleOptions,
	passwordValue,
	setCurrentStep,
	trigger,
}) => {
	const navigate = useNavigate();

	const validateAndGoNext = async () => {
		const isFirstStepValid = await trigger(["username", "email", "password", "confirm_password", "role"]);

		console.log(errors);

		if (isFirstStepValid) setCurrentStep(1);
	};

	console.log("X?");

	return (
		<div className='signin-form-container'>
			<div className='signin-form'>
				<h1>Create account</h1>
				<form>
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
								message: "Wrong email fromat",
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
								digits: (value) => RegexpValidators.PASSWORD_NUMBER.test(value),
								specialChar: (value) => RegexpValidators.SPECIAL_CHARACTERS.test(value),
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

					<div className='singin-form__select'>
						<Controller>
							<Select
								className='category-list__select category-list__select--wider'
								inputId='companies'
								options={roleOptions}
								placeholder='Role'
								onChange={(e) => setValue("role", e?.value || "")}
							/>
							{errors.role && <span>{errors.role.message}</span>}
						</Controller>
					</div>

					<div className='form-field form-field-break'></div>
					<button
						onClick={() => {
							validateAndGoNext();
						}}
					>
						Next
					</button>
					<button onClick={() => navigate("/")}></button>
					<div className='form-progress'>1/2</div>
				</form>
			</div>
		</div>
	);
};

export default SignUpForm;
