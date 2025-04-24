/*'use strict'

async function mostrarFotoPerfil() {
    // lê o id salvo
    const idUsuarioLogado = Number(localStorage.getItem('idUser'))

    // busca só esse usuário
    const resposta = await fetch('https://back-spider.vercel.app/user/listarUsers')
    const usuarios = await resposta.json()
    const usuario = usuarios.find(user => user.id === idUsuarioLogado)

    // troca a imagem do cabeçalho
    const fotoPerfil = document.querySelector('#foto-perfil img')
    fotoPerfil.src = usuario.imagemPerfil           // a API devolve a url em imagemperfil
}


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

mostrarFotoPerfil()
carregarPublicacoes()*/


'use strict'

async function mostrarFotoPerfil() {
    // pega o id salvo no localStorage na página de login
    const idUsuarioLogado = Number(localStorage.getItem('idUser'))

    // procura todos os usuários
    const resp = await fetch('https://back-spider.vercel.app/user/listarUsers')
    const usuarios = await resp.json()

    // procura o usuário logado
    const usuario = usuarios.find(u => u.id === idUsuarioLogado)
    if (!usuario) return

    // troca a imagem de perfil
    const fotoPerfil = document.querySelector('#foto-perfil img')
    fotoPerfil.src = usuario.imagemPerfil
}

async function carregarPublicacoes() {
    try {
        // busca todas as publicações 
        const respPublis = await fetch('https://back-spider.vercel.app/publicacoes/listarPublicacoes')
        const publicacoes = await respPublis.json()

        // busca todos os usuários 
        const respUsers = await fetch('https://back-spider.vercel.app/user/listarUsers')
        const usuarios  = await respUsers.json()


        exibirPublicacoes(publicacoes, usuarios)
    } catch (erro) {
        console.error('erro ao carregar dados:', erro)
    }
}


function exibirPublicacoes(publicacoes, usuarios) {
    const main = document.querySelector('main')  

    publicacoes.forEach(pub => {
        // qm é o autor da publicacao
        const autor = usuarios.find(u => u.id === Number(pub.idUsuario))

        // cria o elemento do post
        const post = document.createElement('div')
        post.classList.add('post')

        post.innerHTML = `
            <div class="cabecalho_post">
                <div class="avatar">
                    <img src="${autor.imagemPerfil}" alt="Avatar de ${autor.nome}"
                         style="width:100%;height:100%;border-radius:50%;">
                </div>
                <div class="info">
                    <p class="username">${autor.nome}</p>
                    <p class="local">${pub.local}</p>
                </div>
            </div>

            <div class="imagem-post">
                <img src="${pub.imagem}" alt="Imagem da publicação"
                     style="width:100%;height:100%;border-radius:5px;object-fit:cover;">
            </div>

            <div class="descricao"><p>${pub.descricao}</p></div>

            <div class="acoes">
                <img src="img/heart_false.png" alt="curtir"
                     class="icone heart" data-id="${pub.id}" data-curtido="false">

                <img src="img/chat.png"  alt="comentar"
                     class="icone chat"  data-id="${pub.id}">
            </div>

            <div class="comentarios" id="comentarios-${pub.id}" style="display:none;"></div>

            <div class="divisor_post"><div class="linha_post"></div></div>
        `
        main.appendChild(post)

        const botaoCurtir = post.querySelector('.heart')
        botaoCurtir.addEventListener('click', () => {
            // só envia like se ainda não curtiu
            if (botaoCurtir.getAttribute('data-curtido') === 'false')
                curtirPublicacao(botaoCurtir)
        })

        const divComentarios = post.querySelector(`#comentarios-${pub.id}`)
        const botaoChat      = post.querySelector('.chat')

        // ao clicar no ícone de chat, mostra ou esconde os comentários
        botaoChat.addEventListener('click', () =>
            toggleComentarios(pub.comentarios || [], usuarios, divComentarios)
        )
    })
}

async function curtirPublicacao(botao) {
    const idPublicacao = botao.getAttribute('data-id')
    const idUsuario    = Number(localStorage.getItem('idUser')) || 4 

    try {
        await fetch(`https://back-spider.vercel.app/publicacoes/likePublicacao/${idPublicacao}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idUser: idUsuario })
        })

        botao.src = 'img/heart_true.png'
        botao.setAttribute('data-curtido', 'true')
    } catch (erro) {
        console.error('erro ao curtir publicação:', erro)
    }
}

function toggleComentarios(comentarios, usuarios, div) {

    if (div.style.display === 'block') {
        div.style.display = 'none'
        div.innerHTML = ''
        return
    }

    if (comentarios.length === 0) {
        div.innerHTML = '<p>Sem comentários ainda...</p>'
    } else {
        comentarios.forEach(c => {
            // acha o nome do autor do comentário
            const autor = usuarios.find(u => u.id === Number(c.idUsuario)) || { nome: 'Usuário' }

            // cria o parágrafo: Nome em negrito + comentário
            const p = document.createElement('p')

            //strong fica em negrito
            p.innerHTML = `<strong>${autor.nome}</strong> ${c.descricao}`
            div.appendChild(p)
        })
    }

    div.style.display = 'block'
}

document.getElementById('botao-sair').addEventListener('click', () => {
    const querSair = confirm('Tem certeza de que deseja sair?')
    if (!querSair) return            

    localStorage.removeItem('idUser') 
    window.location.href = 'index.html'
})



mostrarFotoPerfil()  
carregarPublicacoes() 
