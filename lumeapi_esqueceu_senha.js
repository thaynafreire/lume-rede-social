'use strict'

async function verificarUsuario() {

    const email = document.getElementById('e-mail').value
    const palavraChave = document.getElementById('palavra_chave').value


    if (email === '' || palavraChave === '') {
        alert('Por favor, preencha todos os campos!')
        return
    }


    const url = 'https://back-spider.vercel.app/user/RememberPassword'
    const dados = { email, wordKey: palavraChave }

    try {
        // envia a requisição para a API
        const resposta = await fetch(url, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(dados) 
        })

        
        const resultado = await resposta.json()

        // se a resposta e o resultado der certo, vai para a página de redefinir a senha
        if (resposta.ok && resultado.id) {
            window.location.href = `link-para-redefinir-senha.html?id=${resultado.id}`
        } else {
            alert('E-mail ou senha incorretos!')
        }
    } catch (erro) {
        console.error('Erro ao validar usuário:', error)
        alert('Ocorreu um erro. Tente novamente mais tarde')
    }
}

document.getElementById('botao-recuperacao').addEventListener('click', verificarUsuario)

