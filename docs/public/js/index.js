document.getElementById('btnIniciarSesion').addEventListener('click', (e) => {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();

    if (!usuario || !contrasena) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    if (usuario === 'administrator' && contrasena === 'administratorp5') {
        window.location.href = 'administrator.html';
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    const user = usuarios.find(u => u.dni === usuario && u.contrasena === contrasena);

    if (user) {
        localStorage.setItem("usuarioActivo", JSON.stringify(user));
        localStorage.setItem("token", "usuario_dummy_token");
        window.location.href = 'appview.html';
    } else {
        alert('Credenciales inválidas. Verifique su DNI y contraseña.');
    }
});
