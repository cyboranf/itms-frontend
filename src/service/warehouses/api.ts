import instanceAxios from "../../helpers/axios/axios";
import { Paths } from "./path";
import { Warehouse } from "./types";

export const getAllWarehouses = async (): Promise<Warehouse[]> => {
	const data = await instanceAxios.get<Warehouse[]>(Paths.Warehouse);
	return data.data;
};