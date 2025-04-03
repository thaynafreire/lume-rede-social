'use strict' 


async function atualizarSenha() {
    // pega o ID do usuário da URL
    const userId = new URLSearchParams(window.location.search).get('id')

    // se não tiver ID, mostra um alerta e para o processo
    if (!userId) {
        alert('Usuário não encontrado. Tente novamente.')
        return
    }

    const senha = document.getElementById('senha').value
    const confirmarSenha = document.getElementById('confirmar_senha').value


    if (senha === '' || confirmarSenha === '') {
        alert('Por favor, preencha todos os campos!')
        return
    }


    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem!')
        return
    }

    try {
        // requisição p API 
        const resposta = await fetch(`https://back-spider.vercel.app/user/newPassword/${userId}`, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ senha }) 
        })

        
        if (resposta.ok) {
            alert('Senha redefinida com sucesso!')
            window.location.href = 'index.html'
        } else {
            alert('Erro ao redefinir a senha. Tente novamente.')
        }
    } catch (error) {
        
        console.error('Erro ao redefinir a senha:', error)
        alert('Ocorreu um erro. Tente novamente mais tarde.')
    }
}


document.getElementById('botao-recuperacao').addEventListener('click', atualizarSenha)

