import { AxiosInstance } from "axios";
import { Paths } from "./path";
import { Items } from "./types";

export const getAllItems = async (axios: AxiosInstance): Promise<Items[]> => {
	const data = await axios.get<Items[]>(Paths.ITEMS);
	return data.data;
};

export const PostItems = async (params: Items, axios: AxiosInstance) => {
	try {
		await axios.post(Paths.ITEMS, params);
		return true;
	} catch (error) {
		console.error("Błąd podczas aktualizacji zadania:", error);
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
