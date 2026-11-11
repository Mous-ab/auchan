import { fetchData } from "./api.js";
import { rendreCatalogue } from "./ui.js";

const catalogContainer = document.getElementById("catalog-container");
const recherche = document.getElementById("search-input");
const paginationContainer = document.getElementById("pagination-container");
const categoryButtonsContainer = document.getElementById("category-filters");

let tousProduits = [];
let produitsFiltres = [];
let currentPage = 1;
const itemsPerPage = 8;
let activeCategory = "all";
let panier = [];

fetchData()
    .then(data => {
        if (data && data.products) {
            tousProduits = data.products;
            appliquerFiltres();
            initDragAndDrop(); // 👈 C'ICI QU'IL FALLAIT L'ACTIVER !
        }
    })
    .catch(error => {
        console.error("Erreur lors de l'initialisation du catalogue", error);
    });

function appliquerFiltres() {
    const searchTerm = recherche ? recherche.value.toLowerCase() : "";

    produitsFiltres = tousProduits.filter(product => {
        const matchCategory = activeCategory === "all" || product.category === activeCategory;
        const matchSearch = product.name.toLowerCase().includes(searchTerm);
        return matchCategory && matchSearch;
    });

    currentPage = 1;
    mettreAJourAffichage();
}

function mettreAJourAffichage() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    const produitsPagines = produitsFiltres.slice(startIndex, endIndex);
    
    rendreCatalogue(produitsPagines, catalogContainer);
    rendrePagination();
}

function rendrePagination() {
    if (!paginationContainer) return;

    const totalPages = Math.ceil(produitsFiltres.length / itemsPerPage);

    if (totalPages <= 1) {
        paginationContainer.innerHTML = "";
        return;
    }

    let paginationHTML = "";

    paginationHTML += `
        <button 
            id="prev-btn" 
            class="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium bg-white text-[#14375f] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            ${currentPage === 1 ? 'disabled' : ''}>
            Précédent
        </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage;
        paginationHTML += `
            <button 
                class="page-number px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${isActive ? 'bg-[#14375f] text-white shadow-sm' : 'bg-white border border-gray-200 text-[#14375f] hover:bg-gray-50'}"
                data-page="${i}">
                ${i}
            </button>
        `;
    }

    paginationHTML += `
        <button 
            id="next-btn" 
            class="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium bg-white text-[#14375f] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            ${currentPage === totalPages ? 'disabled' : ''}>
            Suivant
        </button>
    `;

    paginationContainer.innerHTML = paginationHTML;
    
    const prevBtn = document.getElementById("prev-btn");
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                mettreAJourAffichage();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    const nextBtn = document.getElementById("next-btn");
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (currentPage < totalPages) {
                currentPage++;
                mettreAJourAffichage();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    const pageButtons = paginationContainer.querySelectorAll(".page-number");
    pageButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            currentPage = parseInt(e.target.dataset.page);
            mettreAJourAffichage();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

if (recherche) {
    recherche.addEventListener("input", () => {
        appliquerFiltres();
    });
}

if (categoryButtonsContainer) {
    categoryButtonsContainer.addEventListener("click", (e) => {
        const clickedBtn = e.target.closest(".category-btn");
        if (!clickedBtn) return;

        activeCategory = clickedBtn.dataset.category;

        const buttons = categoryButtonsContainer.querySelectorAll(".category-btn");
        buttons.forEach(btn => {
            if (btn === clickedBtn) {
                btn.className = "category-btn px-4 py-2 rounded-xl text-xs font-bold transition-all bg-[#14375f] text-white shadow-sm";
            } else {
                btn.className = "category-btn px-4 py-2 rounded-xl text-xs font-bold transition-all bg-white border border-gray-200 text-gray-600 hover:bg-gray-50";
            }
        });

        appliquerFiltres();
    });
}

function initDragAndDrop() {
    const cartZone = document.getElementById("cart-drop-zone"); 
    
    if (cartZone) {
        cartZone.addEventListener("dragover", (e) => {
            e.preventDefault(); 
            e.dataTransfer.dropEffect = "copy";
            cartZone.classList.add("border-[#14375f]", "bg-blue-50");
            console.log("👉 Survol de la zone panier OK !"); // TEST 1
        });

        cartZone.addEventListener("drop", (e) => {
            e.preventDefault();
            cartZone.classList.remove("border-[#14375f]", "bg-blue-50");
            console.log("🎯 Événement DROP déclenché !"); // TEST 2

            const productId = e.dataTransfer.getData("text/plain");
            console.log("📦 ID récupéré :", productId); // TEST 3

            if (!productId) return;

            const produitAjoute = tousProduits.find(p => p.id == productId);
            console.log("🔍 Produit trouvé :", produitAjoute); // TEST 4
            
            if (produitAjoute) {
                ajouterAuPanier(produitAjoute);
            }
        });
    }
}

function ajouterAuPanier(produit) {
    panier.push(produit);
    console.log("Produit ajouté au panier par Drag & Drop :", produit.name);
    console.log("Contenu actuel du panier :", panier);
    
    // Mettre à jour l'affichage visuel du panier
    rendrePanierVisuel();
}

function rendrePanierVisuel() {
    const cartZone = document.getElementById("cart-drop-zone");
    if (!cartZone) return;

    if (panier.length === 0) {
        cartZone.innerHTML = `Glissez un article au panier`;
        return;
    }

    // Générer la liste des produits dans le panier
    let panierHTML = `<div class="space-y-2 text-left">`;
    let total = 0;

    panier.forEach((item, index) => {
        total += Number(item.price);
        panierHTML += `
            <div class="flex justify-between items-center text-xs border-b border-gray-100 py-1">
                <span class="font-medium text-[#14375f] truncate max-w-[120px]">${item.name}</span>
                <span class="font-bold text-gray-600">${item.price} FCFA</span>
            </div>
        `;
    });

    panierHTML += `</div>`;
    cartZone.innerHTML = panierHTML;

    // Mettre à jour le total global si tu as un élément pour l'afficher
    const totalElement = document.querySelector(".border-t.border-gray-100.pt-3 span:last-child");
    if (totalElement) {
        totalElement.textContent = `${total.toFixed(2)} FCFA`;
    }
}