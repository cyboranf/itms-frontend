import instanceAxios from "../../helpers/axios/axios";
import { Paths } from "./path";
import { Items } from "./types";

export const getAllItems = async (): Promise<Items[]> => {
	const data = await instanceAxios.get<Items[]>(Paths.ITEMS);
	return data.data;
};

export const PostItems = async (params: Items) => {
	try {
		await instanceAxios.post(Paths.ITEMS, params);
		return true;
	}
	catch (error){
		console.error("Błąd podczas aktualizacji zadania:", error);
        return false;
	}
} 

