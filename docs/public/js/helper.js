var iniciado = false;

function mostrarPanel() {
    var panel = document.getElementById("panel-conversacion");
    panel.style.display = "block";
    panel.style.position = "absolute";
    panel.style.top = "120px"; // Ajustado para que no aparezca muy abajo
    panel.style.right = "0px";
    if (!iniciado) {
        mostrarOpciones();
        iniciado = true;
    }
}

function cerrarPanel() {
    var panel = document.getElementById("panel-conversacion");
    panel.style.display = "none";
    var conversacion = document.getElementById("conversacion");
    conversacion.innerHTML = "";
    iniciado = false;
}

document.getElementById('boton-chatbot').addEventListener('click', mostrarPanel);
document.getElementById('cerrar-conversacion').addEventListener('click', cerrarPanel);

function mostrarOpciones() {
    var conversacion = document.getElementById("conversacion");

    const mensajes = [
        ">>>👋 Hola, soy tu Asistente virtual. ¿En qué puedo ayudarte hoy?",
        "1. Tengo un problema técnico (hardware) con mi equipo.",
        "2. Tengo problemas con la conexión a Internet.",
        "3. ¿Cómo puedo obtener ayuda para un problema no técnico-físico (software)?",
        ">>>Elige una opción (1-3):"
    ];

    mensajes.forEach(texto => {
        var mensaje = document.createElement("div");
        mensaje.className = "mensaje";
        mensaje.innerHTML = `<p class='texto'>${texto}</p>`;
        conversacion.appendChild(mensaje);
    });

    agregarCajaTextoYBoton(responderOpcion);
}

function agregarCajaTextoYBoton(callback) {
    eliminarEntradaAnterior();

    var conversacion = document.getElementById("conversacion");

    var entrada = document.createElement("input");
    entrada.type = "text";
    entrada.className = "entrada";
    entrada.style.padding = "10px";
    entrada.style.border = "1px solid #ccc";
    entrada.style.borderRadius = "5px";
    entrada.style.width = "70%";
    entrada.style.marginTop = "10px";

    var botonEnviar = document.createElement("button");
    botonEnviar.className = "enviar";
    botonEnviar.innerHTML = "Enviar";

    // Estilos consistentes
    botonEnviar.style.padding = "10px";
    botonEnviar.style.marginLeft = "10px";
    botonEnviar.style.border = "none";
    botonEnviar.style.borderRadius = "5px";
    botonEnviar.style.background = "#3cb840";
    botonEnviar.style.color = "#fff";
    botonEnviar.style.cursor = "pointer";

    conversacion.appendChild(entrada);
    conversacion.appendChild(botonEnviar);

    botonEnviar.addEventListener("click", () => {
        if (entrada.value.trim() !== "") {
            mostrarMensajeUsuario(entrada.value);
            callback(entrada.value.trim());
        }
    });

    entrada.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            botonEnviar.click();
        }
    });
}

function eliminarEntradaAnterior() {
    document.querySelectorAll(".entrada, .enviar").forEach(el => el.remove());
}

function mostrarMensajeUsuario(texto) {
    var conversacion = document.getElementById("conversacion");
    var mensaje = document.createElement("div");
    mensaje.className = "mensaje";
    mensaje.innerHTML = `<p class='texto'>Tú: ${texto}</p>`;
    conversacion.appendChild(mensaje);
    conversacion.scrollTop = conversacion.scrollHeight;
}

function mostrarMensajeBot(texto) {
    var conversacion = document.getElementById("conversacion");
    var mensaje = document.createElement("div");
    mensaje.className = "mensaje";
    mensaje.innerHTML = `<p class='texto'>${texto}</p>`;
    conversacion.appendChild(mensaje);
    conversacion.scrollTop = conversacion.scrollHeight;
}

function responderOpcion(opcion) {
    switch (opcion) {
        case "1":
            mostrarMensajeBot(">>Okay, ¿está correctamente enchufado? (1.Sí / 2.No)");
            agregarCajaTextoYBoton(respuesta => {
                mostrarMensajeUsuario(respuesta);
                if (respuesta === "1" || respuesta === "2") {
                    mostrarMensajeBot(">>🔧 Puedes registrar tu incidencia aquí: <a href='https://visitante1204.github.io/Helpdesk/form.html'>Formulario de Incidencia</a>");
                    eliminarEntradaAnterior();
                } else {
                    mostrarMensajeBot("Por favor, ingresa una opción válida (1 o 2).");
                    agregarCajaTextoYBoton(arguments.callee);
                }
            });
            break;

        case "2":
            mostrarMensajeBot(">>¿Usas un equipo de la institución? (1.Sí / 2.No)");
            agregarCajaTextoYBoton(respuesta => {
                mostrarMensajeUsuario(respuesta);
                if (respuesta === "1") {
                    mostrarMensajeBot(">>Intenta reconectarte a internet desde el ícono en la parte inferior derecha. (1.Ya lo intenté / 2.No encuentro la opción)");
                    agregarCajaTextoYBoton(respuesta2 => {
                        mostrarMensajeUsuario(respuesta2);
                        if (respuesta2 === "1") {
                            mostrarMensajeBot(">>🔧 Aquí tienes el formulario para reportar el problema: <a href='https://visitante1204.github.io/Helpdesk/form.html'>Formulario</a>");
                            eliminarEntradaAnterior();
                        } else if (respuesta2 === "2") {
                            mostrarMensajeBot(">>Haz clic cerca del ícono de sonido. Desconecta y vuelve a conectar. ¿Funcionó? (1.Sí / 2.No)");
                            agregarCajaTextoYBoton(respuesta3 => {
                                mostrarMensajeUsuario(respuesta3);
                                if (respuesta3 === "1") {
                                    mostrarMensajeBot(">>Okay, ¡me alegra haber ayudado!");
                                    eliminarEntradaAnterior();
                                } else if (respuesta3 === "2") {
                                    mostrarMensajeBot(">>🔧 Llena este formulario para más soporte: <a href='https://visitante1204.github.io/Helpdesk/form.html'>Formulario</a>");
                                    eliminarEntradaAnterior();
                                } else {
                                    mostrarMensajeBot("Por favor, ingresa una opción válida (1 o 2).");
                                    agregarCajaTextoYBoton(arguments.callee);
                                }
                            });
                        } else {
                            mostrarMensajeBot("Por favor, ingresa una opción válida (1 o 2).");
                            agregarCajaTextoYBoton(arguments.callee);
                        }
                    });
                } else if (respuesta === "2") {
                    mostrarMensajeBot(">>🔧 Por favor llena el siguiente formulario para soporte: <a href='https://visitante1204.github.io/Helpdesk/form.html'>Formulario</a>");
                    eliminarEntradaAnterior();
                } else {
                    mostrarMensajeBot("Por favor, ingresa una opción válida (1 o 2).");
                    agregarCajaTextoYBoton(arguments.callee);
                }
            });
            break;

        case "3":
            mostrarMensajeBot(">>🔧 Aquí tienes el formulario para registrar tu incidencia: <a href='https://visitante1204.github.io/Helpdesk/form.html'>Formulario</a>");
            eliminarEntradaAnterior();
            break;

        default:
            mostrarMensajeBot("Opción no válida. Por favor, elige una opción entre 1 y 3.");
            agregarCajaTextoYBoton(responderOpcion);
            break;
    }
}
