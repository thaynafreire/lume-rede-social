'use strict'

// função para validar os dados do cadastro
function validarDados(nome, senha, confirmarSenha, palavraChave) {
    if (!nome || !senha || !confirmarSenha || !palavraChave) {
        alert('Por favor, preencha todos os campos!')
        return false
    }

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!')
        return false
    }

    return true
}

// função para realizar a requisição de cadastro
async function cadastrar() {
    const nome = document.getElementById('nome_usuario').value
    const email = document.getElementById('email_usuario').value
    const senha = document.getElementById('senha').value
    const confirmarSenha = document.getElementById('confirmar_senha_usuario').value
    const palavraChave = document.getElementById('palavra_chave_usuario').value
    const planoPremium = document.getElementById('plano').checked ? '1' : '2'
    const imagemPerfil = 'https://i.pinimg.com/736x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg'

    // verifica se os dados são válidos antes de enviar a requisição
    if (!validarDados(nome, senha, confirmarSenha, palavraChave)) {
        return
    }

    const data = {
        nome,
        email,
        senha,
        premium: planoPremium,
        imagemPerfil,
        senhaRecuperacao: palavraChave
    }

    const url = 'https://back-spider.vercel.app/user/cadastrarUser'

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        const result = await response.json()

        alert('Cadastro bem-sucedido!')
        window.location.href = 'index.html' // redireciona para a página de login

    } catch (error) {
        console.error('Erro ao fazer cadastro:', error)
        alert('Ocorreu um erro. Tente novamente mais tarde')
    }
}

// adiciona o clique no botão de cadastro
document.getElementById('botao-cadastro').addEventListener('click', cadastrar)





