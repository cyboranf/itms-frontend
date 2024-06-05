import instanceAxios from "../../helpers/axios/axios";
import { Paths } from "./path";
import { LoginValuesType, RegisterValuesTypes, UserData } from "./types";

export const loginUser = async ({ username, password }: LoginValuesType) => {
	const { data } = await instanceAxios.post<UserData>(Paths.LOGIN, {
		username,
		password,
	});
	const userData = data;
	return userData;
};

export const registerUser = async ({
	username,
	password,
	email,
	confirm_password,
	first_name,
	last_name,
	pesel,
	phone_number,
}: RegisterValuesTypes) => {
	const { data } = await instanceAxios.post<{ data: any }>(Paths.REGISTER, {
		username,
		email,
		password,
		confirmPassword: confirm_password,
		roleId: 1,
		firstName: first_name,
		lastName: last_name,
		pesel,
		phoneNumber: phone_number,
	});

	const userData = data.data;
	return userData;
};
