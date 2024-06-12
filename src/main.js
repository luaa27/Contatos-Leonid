const url = 'http://localhost:8080';

async function getContatos() {
    const link = `${url}/contatos`;
    const response = await fetch(link);
    const data = await response.json();
    console.log(data);
    return data;
}

async function percorrerArray() {
    const retornoAPI = await getContatos();

    retornoAPI.forEach(contato => {
        const nome = contato.nome;
        const email = contato.email;

        const nomeHtml = document.getElementById('nomeContato');
        nomeHtml.value = nome;
    });
}

async function getContato(id) {
    const link = `${url}/contato/${id}`;
    const response = await fetch(link);
    const data = await response.json();    
    return data;
}

async function postContato(dados) {
    const link = `${url}/contato`;
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(dados)
    }
    const response = await fetch(link, options);
    return response.ok;
}

async function criarElementoNoBack(params) {
    const nomeHTML = document.getElementById('nome').value;
    const emailHTML = document.getElementById('email').value;

    const novoClienteJSON = {
        nome: nomeHTML,
        email: emailHTML
    }

    const result = await postContato(novoClienteJSON);
    if(result) {
        // Faça alguma coisa se a requisição for bem-sucedida
    } else {
        alert("Ocorreu um erro ao criar a sua conta");
    }
}

async function putContato(dados, id) {
    const link = `${url}/contato/${id}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(dados)
    }
    const response = await fetch(link, options);
    return response.ok;
}

async function AtualizarDadoNoBack(id) {
    const perfilAntigo = await getContato(id);

    const nome = document.getElementById('nomeUsuario');
    nome.value = perfilAntigo.nome;

    const email = document.getElementById('emailUsuario');
    email.value = perfilAntigo.email;

    const btn_editar = document.getElementById('btn_editar');
    btn_editar.addEventListener('click', async () => {
        const novosDados = {
            nome: document.getElementById('nomeUsuario').value,
            email: document.getElementById('emailUsuario').value
        }
        let status = await putContato(novosDados, id);
        if (status) {
            window.location.reload();
        } else {
            alert('Ocorreu um erro');
        }
    });
}

async function deleteContato(id) {
    const link = `${url}/contato/${id}`;
    const options = {
        method: 'DELETE'
    }
    const response = await fetch(link, options);
    return response.ok;
}

const btn_excluir = document.getElementById('btn_excluir');
btn_excluir.addEventListener('click', async function () {
    var confirmado = confirm('Deseja deletar conta?');
    if (confirmado) {
        const result = await deleteContato(id);
        if (result) {
            window.location.reload();
        } else {
            alert('Ocorreu um erro');
        }
    }
});
