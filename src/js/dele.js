'use strict'
export async function deletarProdutos(idProdutos){
    const url = "http://localhost:8080/produtos/" + idProdutos
    const options = {
        method: 'DELETE',
    }
    const response = await fetch(url, options)
    return response.ok
}
const botaoDeletarProduto = document.getElementById("botaoDeletarProduto")