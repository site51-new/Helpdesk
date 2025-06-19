document.getElementById('btnIniciarSesion')
        .addEventListener('click', iniciarSesion);

function iniciarSesion(e) {
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
  const user = users.find(u => u.dni === usuario);

  if (!user) {
    alert('Usuario no encontrado.');
    return;
  }
  if (user.contrasena !== contrasena) {
    alert('Contraseña incorrecta.');
    return;
  }

  localStorage.setItem('loggedUser', JSON.stringify(user));
  window.location.href = 'appview.html';
}
