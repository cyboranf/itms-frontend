import "./sign-up-form.scss";
import { useNavigate } from "react-router-dom";
import "./sign-up-form.scss";
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { RegisterValuesTypes } from "../../service/auth/types";
import { SetStateAction } from "react";
import Input from "../../components/input/input";
type SignUpForm2Props = {
	register: UseFormRegister<RegisterValuesTypes>;
	errors: FieldErrors<RegisterValuesTypes>;
	setCurrentStep: React.Dispatch<SetStateAction<number>>;
	onSubmit: (values: RegisterValuesTypes) => Promise<void>;
	handleSubmit: UseFormHandleSubmit<RegisterValuesTypes>;
};

export const SignUpForm2: React.FC<SignUpForm2Props> = ({
	register,
	errors,
	setCurrentStep,
	handleSubmit,
	onSubmit,
}) => {
	const navigate = useNavigate();
	return (
		<div className='signin-form-container'>
			<div className='signin-form'>
				<h1>Create account</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Input
						placeholder='First name'
						register={register("first_name", {
							minLength: 3,
							maxLength: 18,
							required: "Required",
						})}
						error={errors}
					/>
					<Input
						placeholder='Last name'
						register={register("last_name", {
							minLength: 3,
							maxLength: 18,
							required: "Required",
						})}
						error={errors}
					/>

					<Input
						placeholder='Pesel'
						register={register("pesel", {
							minLength: 11,
							maxLength: 11,
							required: "Required",
						})}
						error={errors}
					/>

					<Input
						placeholder='Tel. Number'
						register={register("phone_number", {
							minLength: 9,
							maxLength: 9,
							required: "Required",
						})}
						error={errors}
					/>

					<div className='form-field form-field-break'></div>
					<button onClick={() => setCurrentStep(0)}>Back</button>
					<div className='form-field form-field-break'></div>
					<button type='submit'>Create</button>
					<div className='form-progress'>2/2</div>
				</form>
			</div>
		</div>
	);
};

export default SignUpForm2;
