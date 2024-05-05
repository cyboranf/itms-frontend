import instanceAxios from "../../helpers/axios/axios";
import { Paths } from "./path";
import { Warehouse } from "./types";

export const getAllWarehouses = async (): Promise<Warehouse[]> => {
	const data = await instanceAxios.get<Warehouse[]>(Paths.WAREHOUSE);
	return data.data;
};


export const deleteWarehous = async (id: string) => {
	instanceAxios.delete(Paths.WAREHOUSE_ID.replace('{id}', id.toString()))
	return true;
};

export const PostWarehouse = async(data: Warehouse ) => {
	try{
		await instanceAxios.post(Paths.WAREHOUSE, data);
		return true;
	}
	catch (error){
		console.error("Błąd podczas dodawania zadania:", error);
		return false;
	}
}

export const PutWarehouse = async(data:Warehouse) => {
	try{
		await instanceAxios.put(Paths.WAREHOUSE_ID.replace('{id}', data.id.toString()), data);
		return true;
	}
	catch (error){
		console.error("Błąd podczas aktualizacji zadania:", error);
		return false;
	}
}