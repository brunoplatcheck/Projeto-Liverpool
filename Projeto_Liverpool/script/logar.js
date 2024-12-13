const usuarios = [
    { email: 'gerente@exemplo.com', senha: 'senha123', papel: 'Gerente' },
    { email: 'supervisor@exemplo.com', senha: 'senha456', papel: 'Supervisor' },
    { email: 'colaborador@exemplo.com', senha: 'senha789', papel: 'Colaborador' }
];

function verificarAutenticacao(email, senha) {
    return usuarios.find(usuario => usuario.email === email && usuario.senha === senha);
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function (event) {
        event.preventDefault(); 

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;
        
        const usuarioAutenticado = verificarAutenticacao(email, password);
        
        if (usuarioAutenticado) {
            if (usuarioAutenticado.papel === role) {
                switch (role) {
                    case 'gerente':
                        window.location.href = 'gerente.html';
                        break;
                    case 'supervisor':
                        window.location.href = 'supervisor.html';
                        break;
                    case 'colaborador':
                        window.location.href = 'colaborador.html';
                        break;
                    default:
                        alert('Papel desconhecido');
                        break;
                }
            } else {
                alert('Papel incorreto para o usuário');
            }
        } else {
            alert('E-mail ou senha incorretos');
        }
    });
});

