'use strict'

// validando email e senha
function validarDados(email, senha) {
    if (email === '' || senha === '') {
        alert('Por favor, preencha todos os campos!')
        return false 
    }
    return true 
}

// função login
async function login() {

    //pegando os valores que o usuario digitou
    const email = document.getElementById('usuario').value
    const senha = document.getElementById('senha').value

    // objeto com os dados p api
    const data = {
        email: email,
        senha: senha
    }

    const urlLogin = 'https://back-spider.vercel.app/login'
    const urlUsuarios = 'https://back-spider.vercel.app/user/listarUsers'


    const options = {
        method: 'POST', //metodo
        headers: {
            'Content-Type': 'application/json' //tipo do conteudo
        },
        body: JSON.stringify(data) // converte o objeto em string json
    }

    try {
        
        const response = await fetch(urlLogin, options) // manda a requisição para a API
        const result = await response.json() // converte a resposta para JSON

        // verificando se fez login
        if (result.success) {
            alert('Login bem-sucedido!')

            const respostaUsuarios = await fetch(urlUsuarios)  //requisição para pegar a lista de usuários

            const listaUsuarios = await respostaUsuarios.json() //converte a resposta da lista em json

            // procura o usuário na lista de usuarios com base no email 
            const usuarioLogado = listaUsuarios.find(usuario => usuario.email === email)

            // se o usuário foi encontrado na lista
            if (usuarioLogado) {
                // salva o id 
                localStorage.setItem('idUser', usuarioLogado.id)
                console.log('id do usuário salvo no localstorage:', usuarioLogado.id)
                window.location.href = 'home.html'
            } else {
                // Caso não encontre o usuário na lista
                console.warn('Usuário não encontrado na lista!')
            }
        } else {
            // Caso o login falhe
            alert('E-mail ou senha incorretos')
        }
    } catch (error) {
        // Se acontecer algum erro com a requisição
        console.error('Erro ao fazer login:', error)
        alert('Ocorreu um erro. Tente novamente mais tarde')
    }
}

// Adiciona um ouvinte de evento ao botão de login
// Quando o botão for clicado, ele executa a função login()
document.getElementById('botao-login')
    .addEventListener('click', login)









