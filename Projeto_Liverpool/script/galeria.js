// galeria.js
document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('uploadForm');
    const updateForm = document.getElementById('updateForm');
    const deleteForm = document.getElementById('deleteForm');

    uploadForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(uploadForm);

        fetch('upload_photo.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Foto adicionada com sucesso!');
                loadGallery();
            } else {
                alert('Erro ao adicionar foto.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    });

    updateForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(updateForm);

        fetch('update_photo.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Foto atualizada com sucesso!');
                loadGallery();
            } else {
                alert('Erro ao atualizar foto.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    });

    deleteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(deleteForm);

        fetch('delete_photo.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Foto excluída com sucesso!');
                loadGallery();
            } else {
                alert('Erro ao excluir foto.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    });

    function loadGallery() {
        fetch('get_photos.php')
            .then(response => response.json())
            .then(data => {
                const gallery = document.querySelector('.galeria-fotos');
                gallery.innerHTML = '';

                data.photos.forEach(photo => {
                    const photoElement = document.createElement('div');
                    photoElement.classList.add('foto');

                    photoElement.innerHTML = `
                        <img src="${photo.url}" alt="${photo.caption}">
                        <p>${photo.caption}</p>
                    `;

                    gallery.appendChild(photoElement);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar galeria:', error);
            });
    }

    loadGallery(); // Carregar a galeria ao iniciar a página
});
