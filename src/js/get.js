async function getContatos() {
    const link = "http://localhost:8080/contatos"
    const response = await fetch(link)
    const data = await response.json()
    return data
}
async function percorrerArray() {
    const retornoAPI = await getContatos()

    retornoAPI.forEach(contato => {
        const nome = contato.nome
        const celular = contato.celular
        const nomeHtml = document.createElement('p')
        const celularHtml = document.createElement('p')

        nomeHtml.value = nome
        celularHtml.value = celular

        const container = document.createElement("div")
        container.classList.add('bg-red', 'gap-12')
        container.replaceChildren(nome,celular) 
        const main = document.getElementById("body")
        main.appendChild(container)

        container.addEventListener("click",()=>
            AtualizarDadoNoBack(contato.id)
        )
    });
}
percorrerArray()
async function getContato(id) {
    const link = `http://localhost:8080/contatos/${id}`

    const response = await fetch(link)
    const data = await response.json()
    return data
}

// async function preencherContato(id) {
//     const contato=await getContato(id)

//         const nome=contato.nome
//         const celular=contato.celular
//         const nomeHtml=document.getElementById('nomeContato')
//                 const celularHtml=document.getElementById('numeroCelular')
//         nomeHtml.value=nome
//         celularHtml.value=celular

//         const container = document.getElementById("contatoFocos")   
//         container.classList.remove("hidden")
//                 const editar = document.getElementById("btn_editar")

// editar.addEventListener("click",()=>{
// criarElementoNoBack()
//     // localStorage.setItem("idContato", contato.id)
// })
// }

async function postContato(dados) {
    const link = `http://localhost:8080/contato`
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(dados)
    }
    const response = await fetch(link, options)
    return response.ok
}

async function putContato(dados, id) {
    const link = `http://localhost:8080/contatos/${id}`
    const options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(dados)
    }
    const response = await fetch(link, options)
    return response.ok
}
async function AtualizarDadoNoBack(id) {
            const container = document.getElementById("contatoFocos")   
            container.classList.remove("hidden")
    const perfilAntigo = await getContato(id)
    const nomeHtml = document.getElementById('nomeContato')
    const celularHtml = document.getElementById('numeroCelular')
    const emailHtml = document.getElementById('emailContato')
    const fotoHtml = document.getElementById('fotoContato')
    const enderecoHtml = document.getElementById('enderecoContato')
    const cidadeHtml = document.getElementById('cidadeContato')

    nomeHtml.value = perfilAntigo.nome
    celularHtml.value = perfilAntigo.celular
    emailHtml.value = perfilAntigo.email
    enderecoHtml.value = perfilAntigo.endereco
    fotoHtml.value = perfilAntigo.foto
    cidadeHtml.value = perfilAntigo.cidade
        localStorage.setItem("idContato", perfilAntigo.id)


    const btn_editar = document.getElementById('btn_editar')
    btn_editar.addEventListener('click', async () => {
        const id=localStorage.getItem('idContato')
        const novosDados = {
            nome: document.getElementById('nomeContato').value,
            celular: document.getElementById('numeroCelular').value,
            foto: document.getElementById('fotoContato').value,
            email: document.getElementById('emailContato').value,
            endereco: document.getElementById('enderecoContato').value,
            cidade: document.getElementById('cidadeContato').value
        }
        let status = await putContato(novosDados, id)
        if (status) {
            window.location.reload()
        }
        else {
            alert('Ocorreu um erro')
        }

    })
    const btn_deletar = document.getElementById('btn_deletar')
    console.log(btn_deletar);
    btn_deletar.addEventListener('click', async function () {
        var confirmado = confirm("Deseja deletar conta ?");
        if (confirmado) {
            const result = await deleteContato(id)
            if (result) {
                window.location.reload()
            } else {
                alert('Ocorreu um erro')
            }
        }
    })



}
async function deleteContato(id) {
    const link = `http://localhost:8080/contatos/${id}`
    const options = {
        method: "DELETE"
    }
    const response = await fetch(link, options)
    return response.ok
}
