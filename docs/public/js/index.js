document.getElementById('btnIniciarSesion').addEventListener('click', (e) => {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();

    if (!usuario || !contrasena) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    if (usuario === 'administrador' && contrasena === 'administradorp5') {
        window.location.href = 'administrator.html';
        return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.dni === usuario && u.contrasena === contrasena);

    if (!user) {
        alert("Credenciales inválidas o usuario no registrado.");
        return;
    }

    localStorage.setItem("loggedUser", JSON.stringify(user));
    window.location.href = 'appview.html';
});
