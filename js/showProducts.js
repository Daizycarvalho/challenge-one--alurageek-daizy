// SHOW PRODUCTS

import { connectApi } from "./connectApi.js";
import { deleteProduct } from "./deleteProduct.js";

const products = document.querySelector("[data-products]");

function buildCard(name, price, image, id) {
    const card = document.createElement("ul");
    card.className = "product_card";
    card.innerHTML = `
        <div class="product_card_top">
            <li class="product_img"><img src="${image}" alt="${name}"></li>
            <li class="product_name">${name}</li>
        </div>
        <div class="product_card_bottom">
            <li class="product_price">R$ ${price}</li>
            <li><button class="product_card_delete" id=${id} data-form-delete><img src="./assets/trash.svg" alt="icone de lixeira"></button></li>
        </div>
    `;

    return card;
}

async function listProducts() {
    try {
        const listApi = await connectApi.listProducts();

        if (listApi.length > 0) {
            listApi.forEach(element => {
                products.appendChild(buildCard(element.nome, element.preco, element.imagem, element.id));
            });

            const deleteBtns = document.querySelectorAll("[data-form-delete]");
            deleteBtns.forEach(btn => {
                btn.addEventListener("click", () => deleteProduct(btn.id));
            });
        } else {
            products.innerHTML = `
                <h1 class="no_product">NENHUM PRODUTO CADASTRADO</h1>
            `;
        }
    } catch (error) {
        products.innerHTML = `
            <h1 class="no_product">NÃO FOI POSSÍVEL MOSTRAR OS PRODUTOS</h1>
        `;
        console.error("Erro ao listar produtos:", error);
    }
}

listProducts();