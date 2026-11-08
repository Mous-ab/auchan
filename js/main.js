import { fetchData } from "./api.js";
import { rendreCatalogue } from "./ui.js";

const catalogContainer = document.getElementById("catalog-container");

const recherche = document.getElementById("search-input");

let tousProduits = [];

fetchData()
    .then(data => {
        if (data && data.products) {
            tousProduits = data.products;
            rendreCatalogue(data.products, catalogContainer);
        }
    })

    .catch(error => {
        console.error("Erreur lors de l'initialisation du catalogue", error);
    });

recherche.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase().trim();

    const filteredProducts = tousProduits.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );

    rendreCatalogue(filteredProducts, catalogContainer);
});