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

export const requestItemsReport = async (name: string[], code: string[]) => {
    try {
		
        const response = await instanceAxios.get(Paths.RAPORT, {
            responseType: 'blob', // Ustawienie responseType na blob, aby uzyskać zawartość jako Blob
            params: {
                name,
				code
            }
        });
        
        if (response.status === 200) {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'task-report.pdf');
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
        } else {
            console.error('Błąd podczas pobierania raportu:', response);
        }
    } catch (error) {
        console.error('Błąd sieci:', error);
    }
};