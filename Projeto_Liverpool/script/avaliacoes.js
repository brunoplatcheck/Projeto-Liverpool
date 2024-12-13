document.addEventListener('DOMContentLoaded', () => {
    const verMaisButton = document.getElementById('ver-mais');
    const avaliacoesContainer = document.querySelector('.avaliacoes-container');
    const avaliacaoForm = document.getElementById('avaliacao-form');
    
    // Simulação de comentários antigos (para demonstrar a funcionalidade)
    let comentariosAntigos = [
        { nome: 'Cliente 7', data: '14 de agosto de 2024', estrelas: 5, comentario: 'Excelente atendimento!' },
        { nome: 'Cliente 8', data: '13 de agosto de 2024', estrelas: 4, comentario: 'Gostei bastante do ambiente.' }
    ];

    verMaisButton.addEventListener('click', () => {
        comentariosAntigos.forEach(comentario => {
            adicionarComentario(comentario.nome, comentario.data, comentario.estrelas, comentario.comentario);
        });
        verMaisButton.style.display = 'none'; // Esconde o botão "Ver Mais" após carregar os comentários antigos
    });

    avaliacaoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Coleta os dados do formulário
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const estrelas = document.querySelector('input[name="estrelas"]:checked').value;
        const comentario = document.getElementById('comentario').value;
        const data = new Date().toLocaleDateString('pt-BR');
        const hora = new Date().toLocaleTimeString('pt-BR');

        // Criar um novo objeto de comentário
        const novoComentario = { nome, data: `${data} ${hora}`, estrelas, comentario };

        // Salva o comentário
        salvarComentario(novoComentario);

        // Atualiza os comentários na página
        adicionarComentario(novoComentario.nome, novoComentario.data, novoComentario.estrelas, novoComentario.comentario);

        // Limpa o formulário após o envio
        avaliacaoForm.reset();
    });

    function salvarComentario(comentario) {
        // Esta função deve implementar a lógica para salvar o comentário no backend
        // Enviar `comentario` para onde for necessário
        console.log('Salvando comentário:', comentario);
        // Exemplo de onde você deve implementar o salvamento: 
        // ###IMPLEMENTAR###
    }

    function adicionarComentario(nome, data, estrelas, comentario) {
        const avaliacaoDiv = document.createElement('div');
        avaliacaoDiv.classList.add('avaliacao');
        
        const estrelasHTML = '★'.repeat(estrelas) + '☆'.repeat(5 - estrelas);

        avaliacaoDiv.innerHTML = `
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Data:</strong> ${data}</p>
            <p class="estrelas"><strong>Avaliação:</strong> ${estrelasHTML}</p>
            <p class="comentario"><strong>Comentário:</strong> ${comentario}</p>
        `;

        // Adiciona o novo comentário no topo
        avaliacoesContainer.insertBefore(avaliacaoDiv, avaliacoesContainer.firstChild);
    }
});
