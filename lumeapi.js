'use strict'

function validarDados(email, senha) {
    if (email === '' || senha === '') {
        alert('Por favor, preencha todos os campos!')
        return false
    }
    return true
}

// função para realizar a requisição de login
async function login() {
    const email = document.getElementById('usuario').value // pega o e-mail
    const senha = document.getElementById('senha').value // pega a senha


    // dados para o envio na requisição
    const data = {
        email: email,
        senha: senha
    }

    const url = 'https://back-spider.vercel.app/login' // url da API de login

    const options = {
        method: 'POST', // método 
        headers: {
            'Content-Type': 'application/json' // tipo do conteúdo
        },
        body: JSON.stringify(data) // convertendo o objeto para uma string json
    }

    try {
        const response = await fetch(url, options) // manda a requisição para a API
        const result = await response.json() // converte a resposta para JSON

        // verifica se o login foi bem-sucedido
        if (result.success) {
            alert('Login bem-sucedido!')
        } else {
            alert('E-mail ou senha incorretos')
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error)
        alert('Ocorreu um erro. Tente novamente mais tarde')
    }
}

// add o evento de clique no botão de login
document.getElementById('botao-login')
    .addEventListener('click', login)








