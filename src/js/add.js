'use strict'
const cadastrarProdutos = function(){
    const nome = document.getElementById("nome")
    const categorias = document.getElementById("categorias")
    const preco = document.getElementById("preco")
    const desconto = document.getElementById('desconto')
    const imagem = document.getElementById('imagem')
    const descricao = document.getElementById('descricao')
    const quantidade = document.getElementById('quantidade')
    const ingredientes = document.getElementById('ingredientes')
    const id = document.getElementById('id')
    const novoProdutos = {}
    novoProdutos.nome = nome.value
    novoProdutos.categorias = categorias.value
    novoProdutos.preco = preco.value
    novoProdutos.desconto = desconto.value
    novoProdutos.imagem = imagem.value
    novoProdutos.descricao = descricao.value
    novoProdutos.quantidade = quantidade.value
    novoProdutos.ingredientes = ingredientes.value
    novoProdutos.id = id.value
    console.log(novoProdutos)
    cadProd(novoProdutos)
    return novoProdutos
}
const cadProd = async function(prod){
    const url = 'http://localhost:8080/produtos'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(prod)
    }
    const response = await fetch(url, options)
    return response.ok
}
const botao = document.getElementById('botao')
const trocarPagina = function(){
    if(cadastrarProdutos()){
        window.location.href = '../index.html'
    }
}
botao.addEventListener('click', cadastrarProdutos)