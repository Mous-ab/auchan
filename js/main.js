import { fetchData } from "./api.js";
import { rendreCatalogue } from "./ui.js";

const catalogContainer = document.getElementById("catalog-container");
const recherche = document.getElementById("search-input");

let tousProduits = [];
let produitsFiltres = [];
let currentPage = 1;
const itemsPerPage = 8;

fetchData()
    .then(data => {
        if (data && data.products) {
            tousProduits = data.products;
            produitsFiltres = tousProduits;
            mettreAJourAffichage();
        }
    })

    .catch(error => {
        console.error("Erreur lors de l'initialisation du catalogue", error);
    });

function mettreAJourAffichage() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const produitsPagines = produitsFiltres.slice(startIndex, endIndex);

    rendreCatalogue(produitsPagines, catalogContainer);
}

recherche.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase().trim();

    produitsFiltres = tousProduits.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );

    currentPage = 1;

    mettreAJourAffichage();
});