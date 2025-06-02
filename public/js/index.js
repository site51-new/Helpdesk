const form = document.querySelector('form');
const btnIniciarSesion = document.getElementById('btnIniciarSesion');

btnIniciarSesion.addEventListener('click', (e) => {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const contraseña = document.getElementById('contraseña').value.trim();

    if (usuario && contraseña) {
        const userData = {
            usuario,
            contraseña
        };

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/appview.html';
                } else {
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Ocurrió un error al intentar iniciar sesión');
            });
    } else {
        alert('Por favor, complete todos los campos.');
    }
});
