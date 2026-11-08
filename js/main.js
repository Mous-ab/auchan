import { fetchData } from "./api.js";
import { rendreCatalogue } from "./ui.js";

const catalogContainer = document.getElementById("catalog-container");

fetchData()
    .then(data => {
        if (data && data.products) {
            rendreCatalogue(data.products, catalogContainer);
        }
    })

    .catch(error => {
        console.error("Erreur lors de l'initialisation du catalogue", error);
    });