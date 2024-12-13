document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('menu-form');
    const menuItemsContainer = document.getElementById('menu-items');
    const items = []; // Simula um banco de dados local

    document.addEventListener('DOMContentLoaded', function() {
        // Função para preencher a seção do cardápio
        function preencherCardapio(itens) {
            const menuList = document.getElementById('menu-list');
            menuList.innerHTML = ''; // Limpa a lista antes de adicionar novos itens
    
            itens.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.className = 'menu-item';
    
                menuItem.innerHTML = `
                    <h3>${item.nome}</h3>
                    <p>${item.descricao}</p>
                    <p><strong>R$ ${item.preco.toFixed(2)}</strong></p>
                `;
    
                menuList.appendChild(menuItem);
            });
        }
    
        // Função para buscar os itens do cardápio do backend
        function buscarCardapio() {
            fetch('/api/cardapio') // Substitua com o endpoint real do seu backend
                .then(response => response.json())
                .then(data => {
                    preencherCardapio(data.itens);
                })
                .catch(error => {
                    console.error('Erro ao buscar o cardápio:', error);
                });
        }
    
        // Chama a função para buscar o cardápio quando a página é carregada
        buscarCardapio();
    });
    // Carregar itens do cardápio ao iniciar
    loadMenuItems();

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const itemName = document.getElementById('item').value;
        const itemDescription = document.getElementById('descricao').value;
        const itemPrice = document.getElementById('preco').value;

        // Adiciona/Atualiza item no "banco de dados"
        const existingItem = items.find(item => item.name === itemName);

        if (existingItem) {
            existingItem.description = itemDescription;
            existingItem.price = itemPrice;
        } else {
            items.push({
                name: itemName,
                description: itemDescription,
                price: itemPrice
            });
        }

        // Atualiza a lista de itens no HTML
        loadMenuItems();

        // Limpa o formulário
        form.reset();
    });

    function loadMenuItems() {
        menuItemsContainer.innerHTML = '';
        items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('menu-item');
            itemDiv.innerHTML = `
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p>Preço: R$${item.price}</p>
                <button class="remove-item" data-name="${item.name}">Remover</button>
            `;
            menuItemsContainer.appendChild(itemDiv);
        });

        // Adiciona event listeners para os botões de remover
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function () {
                const itemName = this.getAttribute('data-name');
                removeItem(itemName);
            });
        });
    }

    function removeItem(name) {
        const index = items.findIndex(item => item.name === name);
        if (index > -1) {
            items.splice(index, 1);
            loadMenuItems();
        }
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const menuDisplayPanel = document.querySelector('.menu-display-panel');
    const itemNome = document.getElementById('itemNome');
    const itemDescricao = document.getElementById('itemDescricao');
    const itemPreco = document.getElementById('itemPreco');
    const itemId = document.getElementById('itemId'); // Campo oculto para identificar o item
    const atualizarButton = document.getElementById('atualizarButton');

    // Função para carregar o cardápio
    function carregarCardapio() {
        // Substitua com a URL da sua API para obter o cardápio
        fetch('/api/cardapio')
            .then(response => response.json())
            .then(data => {
                menuDisplayPanel.innerHTML = '';
                data.forEach(item => {
                    const menuItem = document.createElement('div');
                    menuItem.classList.add('menu-item');
                    menuItem.dataset.id = item.id; // Adiciona ID ao data-attribute
                    
                    menuItem.innerHTML = `
                        <h3>${item.nome}</h3>
                        <p>${item.descricao}</p>
                        <p><strong>R$ ${item.preco.toFixed(2)}</strong></p>
                    `;
                    
                    menuItem.addEventListener('click', () => preencherCampos(item));
                    
                    menuDisplayPanel.appendChild(menuItem);
                });
            })
            .catch(error => console.error('Erro ao carregar o cardápio:', error));
    }

    // Função para preencher os campos de edição
    function preencherCampos(item) {
        itemNome.value = item.nome;
        itemDescricao.value = item.descricao;
        itemPreco.value = item.preco;
        itemId.value = item.id; // Preenche o campo oculto com o ID do item
    }

    // Função para atualizar o cardápio
    function atualizarCardapio() {
        const item = {
            id: itemId.value,
            nome: itemNome.value,
            descricao: itemDescricao.value,
            preco: parseFloat(itemPreco.value)
        };

        // Substitua com a URL da sua API para atualizar o cardápio
        fetch(`/api/cardapio/${item.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        .then(response => response.json())
        .then(data => {
            alert('Item atualizado com sucesso!');
            carregarCardapio(); // Recarregar o cardápio após a atualização
        })
        .catch(error => console.error('Erro ao atualizar o item:', error));
    }

    atualizarButton.addEventListener('click', atualizarCardapio);

    // Carregar o cardápio ao iniciar a página
    carregarCardapio();
});
