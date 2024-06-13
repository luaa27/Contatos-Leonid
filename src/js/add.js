
'use strict'
const cadastrarProdutos = async function(){

    const nomeHtml = document.getElementById("nome")
    const celularHtml = document.getElementById("celular")
    const emailHtml = document.getElementById("email")
    const fotoHtml = document.getElementById("foto")
    const enderecoHtml = document.getElementById("endereco")
    const cidadeHtml = document.getElementById("cidade")

    const novoProdutos = {}

    novoProdutos.nome = nomeHtml.value
    novoProdutos.celular=celularHtml.value
    novoProdutos.foto=fotoHtml.value
    novoProdutos.email=emailHtml.value
    novoProdutos.endereco=enderecoHtml.value
    novoProdutos.cidade=cidadeHtml.value


    
    console.log(novoProdutos)
    const retornoApi= await cadProd(novoProdutos)
    if(retornoApi){
        window.location.reload()
    }

    return novoProdutos
}
const cadProd = async function(prod){
    const url = 'http://localhost:8080/contatos'
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
const botao = document.getElementById('btn_adicionar')
botao.addEventListener('click', cadastrarProdutos)

