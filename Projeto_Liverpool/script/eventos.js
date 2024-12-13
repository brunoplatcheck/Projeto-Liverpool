document.addEventListener('DOMContentLoaded', function() {
    const proximosEventosDiv = document.getElementById('proximosEventos');
    const eventosAntigosDiv = document.getElementById('eventosAntigos');
    const calendarioDiv = document.getElementById('calendario');
    const detalhesEventoDiv = document.getElementById('detalhesEvento');
    const detalhesTitulo = document.getElementById('detalhesTitulo');
    const detalhesData = document.getElementById('detalhesData');
    const detalhesDescricao = document.getElementById('detalhesDescricao');
    const fecharDetalhes = document.getElementById('fecharDetalhes');

    function carregarEventos() {
        // Substitua com a URL da sua API para obter os eventos
        fetch('/api/eventos')
            .then(response => response.json())
            .then(data => {
                // Carregar Próximos Eventos
                proximosEventosDiv.innerHTML = '';
                data.proximos.forEach(evento => {
                    const eventoDiv = document.createElement('div');
                    eventoDiv.classList.add('evento');
                    eventoDiv.dataset.id = evento.id;
                    eventoDiv.innerHTML = `
                        <h3>${evento.titulo}</h3>
                        <p>Data: ${evento.data}</p>
                        <p>Descrição: ${evento.descricao}</p>
                    `;
                    eventoDiv.addEventListener('click', () => mostrarDetalhes(evento));
                    proximosEventosDiv.appendChild(eventoDiv);
                });

                // Carregar Eventos Antigos
                eventosAntigosDiv.innerHTML = '';
                data.antigos.forEach(evento => {
                    const eventoDiv = document.createElement('div');
                    eventoDiv.classList.add('evento-antigo');
                    eventoDiv.dataset.id = evento.id;
                    eventoDiv.innerHTML = `
                        <h3>${evento.titulo}</h3>
                        <p>Data: ${evento.data}</p>
                        <p>Descrição: ${evento.descricao}</p>
                    `;
                    eventoDiv.addEventListener('click', () => mostrarDetalhes(evento));
                    eventosAntigosDiv.appendChild(eventoDiv);
                });

                // Preencher o Calendário
                calendarioDiv.innerHTML = '';
                const calendario = document.createElement('div');
                calendario.classList.add('calendario');
                data.futuros.forEach(evento => {
                    const eventoDia = document.createElement('div');
                    eventoDia.classList.add('dia');
                    eventoDia.textContent = evento.data; // Simples exemplo; personalize conforme necessário
                    eventoDia.dataset.id = evento.id;
                    eventoDia.addEventListener('click', () => mostrarDetalhes(evento));
                    calendario.appendChild(eventoDia);
                });
                calendarioDiv.appendChild(calendario);
            })
            .catch(error => console.error('Erro ao carregar eventos:', error));
    }

    function mostrarDetalhes(evento) {
        detalhesTitulo.textContent = evento.titulo;
        detalhesData.textContent = `Data: ${evento.data}`;
        detalhesDescricao.textContent = evento.descricao;
        detalhesEventoDiv.style.display = 'block';
    }

    fecharDetalhes.addEventListener('click', () => {
        detalhesEventoDiv.style.display = 'none';
    });

    carregarEventos();
});
document.addEventListener('DOMContentLoaded', () => {
    const formAdicionarEvento = document.getElementById('formAdicionarEvento');

    formAdicionarEvento.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Coleta os dados do formulário
        const titulo = document.getElementById('titulo').value;
        const dataEvento = document.getElementById('dataEvento').value;
        const descricao = document.getElementById('descricao').value;

        // Simula o armazenamento dos dados (substitua isso por uma chamada AJAX ou Fetch no futuro)
        console.log('Evento Adicionado:');
        console.log(`Título: ${titulo}`);
        console.log(`Data: ${dataEvento}`);
        console.log(`Descrição: ${descricao}`);

        // Limpa o formulário após o envio
        formAdicionarEvento.reset();

        // Atualiza a visualização dos eventos (se necessário)
        atualizarEventos();
    });

    function atualizarEventos() {
        // Aqui você pode implementar a lógica para atualizar a visualização dos eventos na página
        // Por exemplo, recarregar os eventos da página ou atualizar uma lista existente
        console.log('Atualizando a lista de eventos...');
        // Esta função deve ser adaptada para refletir a nova lista de eventos no frontend
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // Simulação de uma lista de reservas (deve ser substituído por uma chamada real ao banco de dados)
    const reservas = [
        { nome: 'João Silva', cpf: '123.456.789-00', email: 'joao@example.com' },
        { nome: 'Maria Oliveira', cpf: '987.654.321-00', email: 'maria@example.com' },
        // Adicione mais reservas conforme necessário
    ];

    const listaReservas = document.getElementById('reservas-list');
    const detalhesReserva = document.getElementById('detalhesReserva');
    const nomeCliente = document.getElementById('nomeCliente');
    const cpfCliente = document.getElementById('cpfCliente');
    const emailCliente = document.getElementById('emailCliente');
    const mensagem = document.getElementById('mensagem');
    const enviarEmailButton = document.getElementById('enviarEmail');

    // Função para carregar a lista de reservas
    function carregarReservas() {
        listaReservas.innerHTML = '';
        reservas.forEach((reserva, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${reserva.nome} - ${reserva.cpf}`;
            listItem.dataset.index = index;
            listItem.addEventListener('click', () => mostrarDetalhes(reserva));
            listaReservas.appendChild(listItem);
        });
    }

    // Função para mostrar os detalhes da reserva selecionada
    function mostrarDetalhes(reserva) {
        nomeCliente.textContent = `Nome: ${reserva.nome}`;
        cpfCliente.textContent = `CPF: ${reserva.cpf}`;
        emailCliente.textContent = `Email: ${reserva.email}`;
        detalhesReserva.style.display = 'block';
    }

    // Função para enviar o e-mail
    enviarEmailButton.addEventListener('click', () => {
        const mensagemTexto = mensagem.value;
        const destinatario = emailCliente.textContent.replace('Email: ', '');
        
        // Simulação de envio de e-mail (substitua isso por uma chamada real a uma API de envio de e-mail)
        console.log(`Enviando email para: ${destinatario}`);
        console.log(`Mensagem: ${mensagemTexto}`);

        // Limpar o campo de mensagem após o envio
        mensagem.value = '';
        detalhesReserva.style.display = 'none';
    });

    // Inicializa a lista de reservas
    carregarReservas();
});
