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
    if (!/^\d{8}$/.test(dni)) {
        mensajeBoton.textContent = "El DNI debe tener exactamente 8 dígitos.";
        return;
    }
    if (!new RegExp(`^${dni}p[1-9]$`).test(contrasena)) {
        mensajeBoton.textContent = "La contraseña debe ser el DNI seguido de 'p' y un dígito 1‑9.";
        return;
    }
    if (contrasena !== confirmarContrasena) {
        mensajeBoton.textContent = "Las contraseñas no coinciden.";
        return;
    }

    const userData = { nombre, apellido, dni, correo, contrasena };

    fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
    })
    .then(async response => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.mensaje || "Error al registrar usuario");
        mensajeBoton.style.color = "green";
        mensajeBoton.textContent = "Cuenta creada con éxito.";
        ["nombre", "apellido", "dni", "correo", "contrasena", "confirmar_contrasena"].forEach(id => {
            document.getElementById(id).value = "";
        });
    })
    .catch(error => {
        console.error("Error:", error);
        mensajeBoton.style.color = "red";
        mensajeBoton.textContent = error.message || "Ocurrió un error al crear la cuenta.";
    });
}
