import "./sign-up-form.scss";
import Select from "react-select";
import { useState } from "react";
import Input from "../../components/input/input";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { RegexpValidators } from "../../utils/reg-exp";
import { RegisterValuesTypes } from "../../service/auth/types";
import { SetStateAction } from "react";
import { Controller, Control } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type SignUpFormProps = {
	register: UseFormRegister<RegisterValuesTypes>;
	setValue: UseFormSetValue<RegisterValuesTypes>;
	errors: FieldErrors<RegisterValuesTypes>;
	roleOptions: { value: string; label: string }[];
	setCurrentStep: React.Dispatch<SetStateAction<number>>;
	passwordValue: string;
	trigger: UseFormTrigger<FieldErrors>;
	control: Control<T>;
	watch: any;
	isSubmitted: boolean;
};

export const SignUpForm: React.FC<SignUpFormProps> = ({
	register,
	errors,
	setValue,
	roleOptions,
	passwordValue,
	setCurrentStep,
	trigger,
	control,
	watch,
	isSubmitted,
}) => {
	const navigate = useNavigate();
	const [wasSubmitted, setWasSubmitted] = useState(false);

	const validateAndGoNext = async (e) => {
		e.preventDefault();
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
				<form onSumbit={validateAndGoNext}>
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
						error={wasSubmitted && errors}
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
						error={wasSubmitted && errors}
					/>
					<Input
						type='password'
						placeholder='Password'
						register={register("password", {
							validate: {
								digits: (value) => RegexpValidators.PASSWORD_NUMBER.test(value) || "Must contain at least one digit",
								specialChar: (value) => RegexpValidators.SPECIAL_CHARACTERS.test(value) || "Must contain at least one special character",
							},
							required: "Required",
						})}
						error={wasSubmitted && errors}
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
						error={wasSubmitted && errors}
					/>

					<div className='singin-form__select'>
						<Controller
							control={control}
							name='role'
							rules={{
								required: "Role is required.", // Simply checking if role is present
							}}
							render={({ onChange, value, name, ref, field }) => (
								<Select
									ref={ref}
									className='category-list__select category-list__select--wider'
									inputId='companies'
									options={roleOptions}
									placeholder='Role'
									value={roleOptions.find((c) => c.value === value)}
									onChange={(val) => field.onChange(val.value)}
								/>
							)}
						></Controller>
						{wasSubmitted && errors.role && (
							<div className='signin-form__error'>
								<span>{errors.role.message}</span>{" "}
							</div>
						)}
					</div>

					<div className='form-field form-field-break'></div>
					<button
						onClick={(e) => {
							setWasSubmitted(true);
							validateAndGoNext(e);
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
