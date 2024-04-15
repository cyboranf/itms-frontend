import instanceAxios from "../../helpers/axios/axios";
import { Paths } from "./path";
import { User } from "./types";

export const getAllUsers = async (): Promise<User[]> => {
	const data = await instanceAxios.get<User[]>(Paths.ALL_USERS);
	return data.data;
};
