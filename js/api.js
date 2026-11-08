export async function fetchData(){
    try {
        const response = await fetch('./data/data.json');
        if (!response.ok) {
            throw new Error("Erreur lors du chargement des données");
        }

        const data = await response.json();
        return data;
    }
    
    catch (error) {
        console.error("Erreur", error);
        throw error;
    }
}