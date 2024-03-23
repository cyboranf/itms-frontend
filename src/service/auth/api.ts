import instanceAxios from "../../helpers/axios/axios";
import { Paths } from "./path";
import { LoginValuesType, RegisterValuesTypes } from "./types";

export const loginUser = async ({ username, password }: LoginValuesType) => {
	const { data } = await instanceAxios.post<{ data: any }>(Paths.LOGIN, {
		username,
		password,
	});
	const userData = data.data;
	return userData;
};

export const registerUser = async ({ username, password, email, role }: RegisterValuesTypes) => {
	const { data } = await instanceAxios.post<{ data: any }>(Paths.REGISTER, {
		email,
		username,
		password,
		role,
	});

	const userData = data.data;
	return userData;
};
