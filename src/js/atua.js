
'use strict'
const idLocal = localStorage.getItem('id')
const prodId = async function(id){
    const url = `http://localhost:8080/produtos/${id}`
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await fetch(url, options)
    const data = await response.json()
    return data
}
const produto =async function(idP){
    let prod = await prodId(idP)
    const nome = document.getElementById("nome")
    const categorias = document.getElementById("categorias")
    const preco = document.getElementById("preco")
    const desconto = document.getElementById('desconto')
    const imagem = document.getElementById('imagem')
    const descricao = document.getElementById('descricao')
    const quantidade = document.getElementById('quantidade')
    const ingredientes = document.getElementById('ingredientes')
    const id = document.getElementById('id')
    nome.value = prod.nome
    categorias.value = prod.categorias
    preco.value = prod.preco
    desconto.value = prod.desconto
    imagem.value = prod.imagem
    descricao.value = prod.descricao
    quantidade.value = prod.quantidade
    ingredientes.value = prod.ingredientes
    id.value = prod.id
}
const atualizeUmProduto = function(){
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
    atualizeProduto(novoProdutos, id.value)
    return novoProdutos
}
const atualizeProduto = async function(prod, id){
    const url = `http://localhost:8080/produtos/${id}`
    const options = {
        method: 'PUT',
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
botao.addEventListener('click', atualizeUmProduto)
produto(idLocal)
trocarPagina
