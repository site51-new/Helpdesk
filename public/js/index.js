
document.getElementById('btnIniciarSesion').addEventListener('click', (e) => {
        e.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();

    if (!usuario || !contrasena) {
        alert('Por favor, complete todos los campos.');
    return;
    }

    const adminUser = 'administrador';
    const adminPass = 'administradorp5';

    if (usuario === adminUser && contrasena === adminPass) {
        window.location.href = '/administrator.html';
    return;
    }

    fetch('https://mi-api-helpdesk.onrender.com/login', {
        method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        },
    body: JSON.stringify({usuario, contrasena}),
    })
    .then(async (response) => {
        const data = await response.json();
    if (response.ok) {
        localStorage.setItem('token', data.token);
    window.location.href = '/appview.html';
        } else {
        alert(data.mensaje || '❌ Credenciales inválidas');
        }
    })
    .catch((error) => {
        console.error('Error al conectar:', error);

    if (error instanceof TypeError && error.message === 'Failed to fetch') {
        alert('⚠️ No se pudo conectar con el servidor. Puede ser un problema de red o CORS (seguridad del navegador).');
        } else {
        alert(`❌ Error desconocido: ${error.message}`);
        }
    });
});

