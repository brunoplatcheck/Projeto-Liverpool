// menudia.js

document.addEventListener("DOMContentLoaded", function () {
    // Array contendo os 4 primeiros itens do cardápio
    const menuItems = [
        {
            title: "Item 1",
            imgSrc: "img/comida3.jpg",
            description: "Prato 1",
        },
        {
            title: "Item 2",
            imgSrc: "img/comida1.jpg",
            description: "Descrição do prato 2.",
        },
        {
            title: "Item 3",
            imgSrc: "img/comida.jpg",
            description: "Descrição do prato 3.",
        },
        {
            title: "Item 4",
            imgSrc: "img/comida1.jpg",
            description: "Descrição do prato 4.",
        }
    ];

    // Seleciona o elemento que será preenchido com os pratos
    const dishGallery = document.querySelector('.dish-gallery');

    // Itera sobre os itens do menu e cria elementos para exibi-los
    menuItems.forEach(item => {
        // Cria um contêiner para cada item do menu
        const dishItem = document.createElement('div');
        dishItem.classList.add('dish-item');

        // Adiciona a imagem do prato
        const dishImg = document.createElement('img');
        dishImg.src = item.imgSrc;
        dishImg.alt = item.title;

        // Adiciona a descrição do prato
        const dishDesc = document.createElement('p');
        dishDesc.textContent = item.description;

        // Adiciona os elementos ao contêiner do prato
        dishItem.appendChild(dishImg);
        dishItem.appendChild(dishDesc);

        // Adiciona eventos de mouseover e mouseout
        dishItem.addEventListener('mouseover', function() {
            dishImg.style.transform = 'scale(1.1)';
            dishDesc.style.opacity = '1';
            dishDesc.style.transform = 'translateY(0)';
        });

        dishItem.addEventListener('mouseout', function() {
            dishImg.style.transform = 'scale(1)';
            dishDesc.style.opacity = '0';
            dishDesc.style.transform = 'translateY(20px)';
        });

        // Adiciona o contêiner do prato à galeria de pratos
        dishGallery.appendChild(dishItem);
    });
});
