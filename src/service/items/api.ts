import { AxiosInstance } from "axios";
import { toast } from "react-toastify";
import { Paths } from "./path";
import { Items, RequestItem } from "./types";

export const getAllItems = async (axios: AxiosInstance): Promise<Items[]> => {
	const data = await axios.get<Items[]>(Paths.ITEMS);
	return data.data;
};

export const PostItems = async (params: RequestItem, axios: AxiosInstance) => {
	try {
		await axios.post(Paths.ITEMS, params);
		toast.success("Dodano nowy produkt");
		return true;
	} catch (error) {
		console.error("Błąd podczas dodawania nowego produktu:", error);
		toast.error("Dodanie nowego produktu nie powiodło się");
		return false;
	}
};

export const updateItem = async (id: number, params: RequestItem, axios: AxiosInstance) => {
	try {
		await axios.put(`${Paths.ITEMS}/${id}`, params);
		toast.success("Zaktualizowano produkt");
		return true;
	} catch (error) {
		console.error("Błąd podczas aktualizacji produktu:", error);
		toast.error("Aktualizacja produktu nie powiodła się");
		return false;
	}
};

export const deleteItem = async (id: number, axios: AxiosInstance) => {
	try {
		await axios.delete(`${Paths.ITEMS}/${id}`);
		toast.success("Usunięto produkt");
		return true;
	} catch (error) {
		console.error("Błąd podczas usuwania produktu:", error);
		toast.error("Usunięcie produktu nie powiodło się");
		return false;
	}
};

export const requestItemsReport = async (name: string[], code: string[], axios: AxiosInstance) => {
	try {
		const response = await axios.get(Paths.RAPORT, {
			responseType: "blob",
			params: {
				name,
				code,
			},
		});

		if (response.status === 200) {
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", "task-report.pdf");
			document.body.appendChild(link);
			link.click();
			window.URL.revokeObjectURL(url);
		} else {
			console.error("Błąd podczas pobierania raportu:", response);
		}
	} catch (error) {
		console.error("Błąd sieci:", error);
	}
};
