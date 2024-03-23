import instanceAxios from "../../helpers/axios/axios";
import { Paths } from "./path";

export const loginUser = async ({ email, password }: any) => {
	const { data } = await instanceAxios.post<{ data: any }>(Paths.LOGIN, {
		email,
		password,
	});
	const userData = data.data;
	console.log(userData);
	return userData;
};
