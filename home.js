/*'use strict' 


async function carregarPublicacoes() {
    try {
        // faz a requisição das publicações
        const respostaPublicacoes = await fetch('https://back-spider.vercel.app/publicacoes/listarPublicacoes')
        const publicacoes = await respostaPublicacoes.json() // convertendo a resposta em json

        // faz a requisição p buscar os usuarios
        const respostaUsuarios = await fetch('https://back-spider.vercel.app/user/listarUsers')
        const usuarios = await respostaUsuarios.json() // 


        exibirPublicacoes(publicacoes, usuarios)
    } catch (erro) {

        console.error('Erro ao carregar dados:', erro)
    }
}

// montando o HTML de cada publicação e colocando no main
function exibirPublicacoes(publicacoes, usuarios) {
    const main = document.querySelector('main') // selecionando a tag main 

    // p cada publicação recebida...
    publicacoes.forEach((publicacao) => {

        // procura o usuário que fez essa publicação, e caso o id do usuario esteja como string, o transforma em numero
        const usuario = usuarios.find((user) => user.id === Number(publicacao.idUsuario))

        // se não encontrar o usuário, mostra um aviso e pula para a próxima publicação
        if (!usuario) {

            return
        }

        // cria uma nova div para o post
        const post = document.createElement('div')
        post.classList.add('post') 

        //montando o html
        post.innerHTML = `
            <div class="cabecalho_post">
                <div class="avatar">
                    <img src="${usuario.imagemPerfil}" alt="Avatar do usuário" style="width: 100%; height: 100%; border-radius: 50%;">
                </div>
                <div class="info">
                    <p class="username">${usuario.nome}</p>
                    <p class="local">${publicacao.local}</p>
                </div>
            </div>
            <div class="imagem-post">
                <img src="${publicacao.imagem}" alt="Imagem da publicação" style="width: 100%; height: 100%; border-radius: 5px; object-fit: cover;">
            </div>
            <div class="descricao">
                <p>${publicacao.descricao}</p>
            </div>
            <div class="acoes">
                <img src="img/heart_false.png" alt="curtir" class="icone" id="heart">
                <img src="img/chat.png" alt="comentar" class="icone" id="chat">
            </div>
            <div class="divisor_post">
            <div class="linha_post"></div>
            </div>
        </div>
        `

        // adiciona o post criado dentro do main
        main.appendChild(post)
    })
}

//chamando a função
carregarPublicacoes()
*/
'use strict'

// Função principal que carrega as publicações e os usuários da API
async function carregarPublicacoes() {
    try {
        // Faz a requisição das publicações
        const respostaPublicacoes = await fetch('https://back-spider.vercel.app/publicacoes/listarPublicacoes')
        const publicacoes = await respostaPublicacoes.json()

        // Faz a requisição dos usuários
        const respostaUsuarios = await fetch('https://back-spider.vercel.app/user/listarUsers')
        const usuarios = await respostaUsuarios.json()

        // Chama a função que vai exibir as publicações na tela
        exibirPublicacoes(publicacoes, usuarios)
    } catch (erro) {
        console.error('Erro ao carregar dados:', erro)
    }
}

// Função que exibe cada publicação na tela
function exibirPublicacoes(publicacoes, usuarios) {
    const main = document.querySelector('main') // Seleciona a tag <main> onde os posts vão aparecer

    publicacoes.forEach((publicacao) => {
        // Procura o usuário dono da publicação
        const usuario = usuarios.find((user) => user.id === Number(publicacao.idUsuario))

        // Se não encontrar o usuário correspondente, pula para o próximo
        if (!usuario) return

        // Cria a div do post
        const post = document.createElement('div')
        post.classList.add('post')

        // Insere o conteúdo HTML do post
        post.innerHTML = `
            <div class="cabecalho_post">
                <div class="avatar">
                    <img src="${usuario.imagemPerfil}" alt="Avatar do usuário" style="width: 100%; height: 100%; border-radius: 50%;">
                </div>
                <div class="info">
                    <p class="username">${usuario.nome}</p>
                    <p class="local">${publicacao.local}</p>
                </div>
            </div>
            <div class="imagem-post">
                <img src="${publicacao.imagem}" alt="Imagem da publicação" style="width: 100%; height: 100%; border-radius: 5px; object-fit: cover;">
            </div>
            <div class="descricao">
                <p>${publicacao.descricao}</p>
            </div>
            <div class="acoes">
                <img src="img/heart_false.png" alt="curtir" class="icone heart" data-id="${publicacao.id}" data-curtido="false">
                <img src="img/chat.png" alt="comentar" class="icone" id="chat">
            </div>
            <div class="divisor_post">
                <div class="linha_post"></div>
            </div>
        `

        // Adiciona o post no <main>
        main.appendChild(post)
    })

    // Depois de carregar todos os posts, adiciona o evento de clique no ícone de curtir
    adicionarEventoCurtir()
}

// Função que adiciona o evento de curtir aos ícones de coração
function adicionarEventoCurtir() {
    // Seleciona todos os ícones de coração
    const coracoes = document.querySelectorAll('.heart')

    coracoes.forEach((icone) => {
        // Adiciona o evento de clique em cada ícone
        icone.addEventListener('click', async () => {
            const idPublicacao = icone.getAttribute('data-id') // ID da publicação
            const curtido = icone.getAttribute('data-curtido') === 'true' // Verifica se já foi curtido

            // Se ainda não foi curtido
            if (!curtido) {
                try {
                    // Faz requisição para curtir a publicação
                    await fetch(`https://back-spider.vercel.app/publicacoes/likePublicacao/${idPublicacao}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            idUser: 4 // ID do usuário que está curtindo (fixo por enquanto)
                        })
                    })

                    // Troca o ícone para coração cheio e marca como curtido
                    icone.src = 'img/heart_true.png'
                    icone.setAttribute('data-curtido', 'true')
                } catch (erro) {
                    console.error('Erro ao curtir publicação:', erro)
                }
            }
        })
    })
}

// Inicia o carregamento das publicações assim que a página for carregada
carregarPublicacoes()

