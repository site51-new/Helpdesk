document.addEventListener('DOMContentLoaded', function () {
    const btnRegistrar = document.getElementById('btnRegistrar');
    const mensajeBotón = document.getElementById('mensaje-botón');

    if (btnRegistrar) {
        btnRegistrar.addEventListener('click', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value.trim();
            const apellido = document.getElementById('apellido').value.trim();
            const dni = document.getElementById('dni').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const contraseña = document.getElementById('contraseña').value.trim();
            const confirmarContraseña = document.getElementById('confirmar_contraseña').value.trim();

            const dniRegex = /^\d{8}$/;
            if (!dniRegex.test(dni)) {
                mensajeBotón.textContent = 'El DNI debe tener 8 dígitos';
                return;
            }

            const contraseñaRegex = new RegExp(`^${dni}p[1-9]$`);
            if (!contraseñaRegex.test(contraseña)) {
                mensajeBotón.textContent = 'La contraseña debe ser el DNI seguido de la letra "p" y un dígito del 1 al 9';
                return;
            }

            if (nombre && apellido && dni && correo && contraseña && confirmarContraseña) {
                if (contraseña === confirmarContraseña) {
                    const userData = {
                        nombre,
                        apellido,
                        dni,
                        correo,
                        contraseña
                    };

                    fetch('/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userData)
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            mensajeBotón.textContent = data.mensaje;
                            if (data.mensaje === 'Cuenta creada con éxito') {
                                // window.location.href = '/login';
                            }
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            mensajeBotón.textContent = 'Ocurrió un error al intentar crear la cuenta';
                        });
                } else {
                    mensajeBotón.textContent = 'Las contraseñas no coinciden';
                }
            } else {
                mensajeBotón.textContent = 'Por favor, complete todos los campos.';
            }
        });
    } else {
        console.error('No se encontró el botón de registrar');
    }
});
