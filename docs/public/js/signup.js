document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnRegistrar").addEventListener("click", registrarUsuario);
});

function registrarUsuario(e) {
    e.preventDefault(); 

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const dni = document.getElementById("dni").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();
    const confirmarContrasena = document.getElementById("confirmar_contrasena").value.trim();
    const mensajeBoton = document.getElementById("mensaje-boton");

    mensajeBoton.textContent = "";
    mensajeBoton.style.color = "red";

    if (!nombre || !apellido || !dni || !correo || !contrasena || !confirmarContrasena) {
        mensajeBoton.textContent = "Por favor, complete todos los campos.";
        return;
    }

    const dniRegex = /^\d{8}$/;
    if (!dniRegex.test(dni)) {
        mensajeBoton.textContent = "El DNI debe tener exactamente 8 dígitos.";
        return;
    }

    const contrasenaRegex = new RegExp(`^${dni}p[1-9]$`);
    if (!contrasenaRegex.test(contrasena)) {
        mensajeBoton.textContent = "La contraseña debe ser el DNI seguido de la letra 'p' y un dígito del 1 al 9.";
        return;
    }

    if (contrasena !== confirmarContrasena) {
        mensajeBoton.textContent = "Las contraseñas no coinciden.";
        return;
    }

    const userData = {
        nombre,
        apellido,
        dni,
        correo,
        contrasena,
    };

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })
        .then(async (response) => {
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.mensaje || "Error al registrar usuario");
            }
            return response.json();
        })
        .then((data) => {
            mensajeBoton.style.color = "green";
            mensajeBoton.textContent = "Cuenta creada con éxito.";
            ["nombre", "apellido", "dni", "correo", "contrasena", "confirmar_contrasena"].forEach(id => {
                document.getElementById(id).value = "";
            });
        })
        .catch((error) => {
            console.error("Error:", error);
            mensajeBoton.style.color = "red";
            mensajeBoton.textContent = error.message || "Ocurrió un error al intentar crear la cuenta.";
        });
}
