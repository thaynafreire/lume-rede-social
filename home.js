'use strict'

async function carregarPublicacoes() {
    try {
        // requisição das publicações
        const respostaPublicacoes = await fetch('https://back-spider.vercel.app/publicacoes/listarPublicacoes')
        const publicacoes = await respostaPublicacoes.json()

        // requisição dos usuários
        const respostaUsuarios = await fetch('https://back-spider.vercel.app/user/listarUsers')
        const usuarios = await respostaUsuarios.json()

        // chama a função 
        exibirPublicacoes(publicacoes, usuarios)

    } catch (erro) {
        console.error('erro ao carregar dados:', erro)
    }
}


function exibirPublicacoes(publicacoes, usuarios) {
    const main = document.querySelector('main') // seleciona o <main> onde os posts vão aparecer

    publicacoes.forEach((publicacao) => {
        // procura o usuário que postou a publicação
        const usuario = usuarios.find((user) => user.id === Number(publicacao.idUsuario))


        // div do post
        const post = document.createElement('div')
        post.classList.add('post')

        // colocando o html no post
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

        //adicioa no main 
        main.appendChild(post)

        //pegando o botao de curtir
        const botaoCurtir = post.querySelector('.heart')


        //add o clique no botao de curitr
        botaoCurtir.addEventListener('click', () => {
            const jaCurtiu = botaoCurtir.getAttribute('data-curtido') === 'true'

            if (!jaCurtiu) {
                console.log(`curtidas: ${botaoCurtir.getAttribute('data-id')}`)
                curtirPublicacao(botaoCurtir)
            }
        })
    })
}

//funçãO que manda o like para a api
async function curtirPublicacao(botao) {
    const idPublicacao = botao.getAttribute('data-id') //pega o id da publicação 
    const idUsuario = 4 // id fixo por enquanto

    try {
        //manda a curtida p api
        await fetch(`https://back-spider.vercel.app/publicacoes/likePublicacao/${idPublicacao}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idUser: idUsuario }) //manda o id do user q curtiu
        })

        //troca a img do coração
        botao.src = 'img/heart_true.png'

        //marca q foi curtido
        botao.setAttribute('data-curtido', 'true')

    } catch (erro) {
        console.error('erro ao curtir publicação:', erro)
    }
}


carregarPublicacoes()





