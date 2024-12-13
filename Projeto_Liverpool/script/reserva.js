document.addEventListener('DOMContentLoaded', function () {
    const { jsPDF } = window.jspdf;

    // Obtém o formulário e o botão de envio
    const form = document.querySelector('form');
    const submitButton = document.querySelector('button[type="submit"]');

    submitButton.addEventListener('click', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Coleta os dados do formulário
        const data = {
            data: document.getElementById('data').value,
            hora: document.getElementById('hora').value,
            nome: document.getElementById('nome').value,
            cpf: document.getElementById('cpf').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            celular: document.getElementById('celular').value
        };

        // Gera o PDF com jsPDF
        const doc = new jsPDF();
        doc.text('Informações da Reserva', 10, 10);
        doc.text(`Data: ${data.data}`, 10, 20);
        doc.text(`Hora: ${data.hora}`, 10, 30);
        doc.text(`Nome: ${data.nome}`, 10, 40);
        doc.text(`CPF: ${data.cpf}`, 10, 50);
        doc.text(`Email: ${data.email}`, 10, 60);
        doc.text(`Telefone Fixo: ${data.telefone}`, 10, 70);
        doc.text(`Celular: ${data.celular}`, 10, 80);

        // Adiciona QR Code (sem valor específico)
        const qrCodeCanvas = document.createElement('canvas');
        $(qrCodeCanvas).qrcode({
            text: '',
            width: 100,
            height: 100
        });
        doc.addImage(qrCodeCanvas.toDataURL('image/png'), 'PNG', 10, 90, 50, 50);

        // Salva o PDF
        doc.save('reserva.pdf');

        // Mostra a mensagem aguardando pagamento
        alert('Reserva realizada com sucesso. Aguardando pagamento.');
    });
});
