document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = "URL_DA_SUA_API"; // Substitua "URL_DA_SUA_API" pela URL real da sua API
    const app = document.getElementById("app");
    const productList = document.getElementById("product-list");
    const addProductBtn = document.getElementById("add-product-btn");
    const productModal = document.getElementById("product-modal");
    const saveProductBtn = document.getElementById("save-product-btn");
    const productNameInput = document.getElementById("product-name");
    const productDescriptionInput = document.getElementById("product-description");
    const productPriceInput = document.getElementById("product-price");

    // Função para obter todos os produtos da API
    function getProducts() {
        fetch(apiUrl + "/products")
            .then(response => response.json())
            .then(products => {
                renderProducts(products);
            })
            .catch(error => console.error("Erro ao obter produtos:", error));
    }

    // Função para renderizar os produtos na página
    function renderProducts(products) {
        productList.innerHTML = "";
        products.forEach(product => {
            const productElement = document.createElement("div");
            productElement.innerHTML = `
                <div class="border rounded p-2 mb-2">
                    <h2 class="text-lg font-bold">${product.name}</h2>
                    <p class="text-gray-700">${product.description}</p>
                    <p class="text-gray-600">Preço: $${product.price}</p>
                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-2 delete-btn" data-id="${product.id}">Excluir</button>
                </div>
            `;
            productList.appendChild(productElement);
        });
    }

    // Função para exibir o modal de adicionar produto
    function showAddProductModal() {
        productModal.classList.remove("hidden");
    }

    // Função para esconder o modal de adicionar produto
    function hideAddProductModal() {
        productModal.classList.add("hidden");
    }

    // Evento de clique no botão "Adicionar Produto"
    addProductBtn.addEventListener("click", showAddProductModal);

    // Evento de clique no botão "Fechar" do modal
    productModal.querySelector(".modal-close").addEventListener("click", hideAddProductModal);

    // Evento de clique no botão "Salvar" do modal
    saveProductBtn.addEventListener("click", function() {
        const name = productNameInput.value;
        const description = productDescriptionInput.value;
        const price = parseFloat(productPriceInput.value);

        // Verifica se todos os campos foram preenchidos
        if (name && description && price) {
            const newProduct = {
                name,
                description,
                price
            };

            // Faz a requisição POST para adicionar o novo produto
            fetch(apiUrl + "/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProduct)
            })
            .then(response => response.json())
            .then(() => {
                // Após adicionar o produto com sucesso, esconde o modal e atualiza a lista de produtos
                hideAddProductModal();
                getProducts();
            })
            .catch(error => console.error("Erro ao adicionar produto:", error));
        } else {
            console.error("Por favor, preencha todos os campos.");
        }
    });

    // Evento de clique no botão "Excluir" de um produto
    productList.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn")) {
            const productId = event.target.dataset.id;
            if (confirm("Tem certeza que deseja excluir este produto?")) {
                // Faz a requisição DELETE para excluir o produto
                fetch(apiUrl + `/products/${productId}`, {
                    method: "DELETE"
                })
                .then(() => {
                    // Após excluir o produto com sucesso, atualiza a lista de produtos
                    getProducts();
                })
                .catch(error => console.error("Erro ao excluir produto:", error));
            }
        }
    });

    // Chama a função para obter todos os produtos ao carregar a página
    getProducts();
});
