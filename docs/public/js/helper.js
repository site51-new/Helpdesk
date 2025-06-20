var iniciado = false;
function mostrarPanel() {
    var panel = document.getElementById("panel-conversacion");
    panel.style.display = "block";
    panel.style.position = "absolute";
    panel.style.top = "380px";
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

document.getElementById('boton-chatbot').addEventListener('click', function () {
    mostrarPanel();
});

document.getElementById('cerrar-conversacion').addEventListener('click', function () {
    cerrarPanel();
});

function mostrarOpciones() {
    var conversacion = document.getElementById("conversacion");
    var mensaje = document.createElement("div");
    mensaje.className = "mensaje";
    mensaje.innerHTML = "<p class='texto'>>>👋 Hola, soy tu Asistente virtual. ¿En qué puedo ayudarte hoy?</p>";
    conversacion.appendChild(mensaje);
    var mensajeOpciones = document.createElement("div");
    mensajeOpciones.className = "mensaje";

    conversacion.appendChild(mensajeOpciones);

    var opciones = [
        "1. Tengo un problema técnico(hardware) con mi equipo.",
        "2. Tengo problemas con la conexión a Internet.",
        "3. ¿Cómo puedo obtener ayuda para un problema no técnico-físico(software)?",
    ];

    for (var i = 0; i < opciones.length; i++) {
        var mensajeOpcion = document.createElement("div");
        mensajeOpcion.className = "mensaje";
        mensajeOpcion.innerHTML = "<p class='texto'>" + opciones[i] + "</p>";
        conversacion.appendChild(mensajeOpcion);
    }

    var mensajePregunta = document.createElement("div");
    mensajePregunta.className = "mensaje";
    mensajePregunta.innerHTML = "<p class='texto'>>>Elige una opción (1-3):</p>";
    conversacion.appendChild(mensajePregunta);

    var entrada = document.createElement("input");
    entrada.type = "text";
    entrada.id = "entrada";
    conversacion.appendChild(entrada);

    var botonEnviar = document.createElement("button");
    botonEnviar.id = "enviar";
    botonEnviar.innerHTML = "Enviar";
    conversacion.appendChild(botonEnviar);
    document.getElementById("enviar").addEventListener("click", enviarMensaje);
}

function enviarMensaje() {
    var entrada = document.getElementById("entrada");
    var conversacion = document.getElementById("conversacion");

    if (entrada.value !== "") {
        var valorEntrada = entrada.value;
        entrada.value = "";

        var mensaje = document.createElement("div");
        mensaje.className = "mensaje";
        mensaje.innerHTML = "<p class='texto'>Tú: " + valorEntrada + "</p>";
        conversacion.appendChild(mensaje);
        conversacion.scrollTop = conversacion.scrollTop + 1000;

        responderOpcion(valorEntrada);
    }
}

function responderOpcion(opcion) {
    var conversacion = document.getElementById("conversacion");

    if (opcion >= 1 && opcion <= 3) {
        switch (opcion) {
            case "1":
                var respuesta = ">>Okay, está correctamente enchufado? (Coloca un número: 1.Sí/2.No)";
                var mensaje = document.createElement("div");
                mensaje.className = "mensaje";
                mensaje.innerHTML = "<p class='texto'>" + respuesta + "</p>";
                conversacion.appendChild(mensaje);
                conversacion.scrollTop = conversacion.scrollTop + 1000;

                agregarCajaTextoYBoton();

                document.querySelectorAll(".enviar")[document.querySelectorAll(".enviar").length - 1].addEventListener("click", function () {
                    var valorEntrada = document.querySelectorAll(".entrada")[document.querySelectorAll(".entrada").length - 1].value;

                    var mensaje = document.createElement("div");
                    mensaje.className = "mensaje";
                    mensaje.innerHTML = "<p class='texto'>Tú: " + valorEntrada + "</p>";
                    conversacion.appendChild(mensaje);
                    conversacion.scrollTop = conversacion.scrollTop + 1000;

                    if (valorEntrada == "1") {
                        var respuesta2 = ">>🔧 Muy bien, en el siguiente Link puedes registrar tu incidencia: <a href='https://visitante1204.github.io/Helpdesk/form.html'>https://visitante1204.github.io/Helpdesk/form.html</a>";
                        var mensaje2 = document.createElement("div");
                        mensaje2.className = "mensaje";
                        mensaje2.innerHTML = "<p class='texto'>" + respuesta2 + "</p>";
                        conversacion.appendChild(mensaje2);
                        conversacion.scrollTop = conversacion.scrollTop + 1000;
                        document.querySelectorAll(".entrada")[document.querySelectorAll(".entrada").length - 1].remove();
                        document.querySelectorAll(".enviar")[document.querySelectorAll(".enviar").length - 1].remove();
                    } else if (valorEntrada == "2") {
                        var respuesta2 = ">>🔧 Okay, ahora te brindaré el link de acceso para que puedas detallar tu Incidencia: <a href='https://visitante1204.github.io/Helpdesk/form.html'>https://visitante1204.github.io/Helpdesk/form.html</a>";
                        var mensaje2 = document.createElement("div");
                        mensaje2.className = "mensaje";
                        mensaje2.innerHTML = "<p class='texto'>" + respuesta2 + "</p>";
                        conversacion.appendChild(mensaje2);
                        conversacion.scrollTop = conversacion.scrollTop + 1000;
                        document.querySelectorAll(".entrada")[document.querySelectorAll(".entrada").length - 1].remove();
                        document.querySelectorAll(".enviar")[document.querySelectorAll(".enviar").length - 1].remove();
                    } else {
                        var respuesta2 = "Por favor, ingrese una opción correcta.(Sólo ingrese 1 o 2.)";
                        var mensaje2 = document.createElement("div");
                        mensaje2.className = "mensaje";
                        mensaje2.innerHTML = "<p class='texto'>" + respuesta2 + "</p>";
                        conversacion.appendChild(mensaje2);
                        conversacion.scrollTop = conversacion.scrollTop + 1000;
                    }
                });
                break;

            case "2":
                var respuesta = ">>Okay, ¿Usas un equipo de la institución?.(Coloca un número: 1.Uso un equipo de la institución/2.No uso un equipo de la institución)";
                var mensaje = document.createElement("div");
                mensaje.className = "mensaje";
                mensaje.innerHTML = "<p class='texto'>" + respuesta + "</p>";
                conversacion.appendChild(mensaje);
                conversacion.scrollTop = conversacion.scrollTop + 1000;

                agregarCajaTextoYBoton();

                document.querySelectorAll(".enviar")[document.querySelectorAll(".enviar").length - 1].addEventListener("click", function () {
                    var valorEntrada = document.querySelectorAll(".entrada")[document.querySelectorAll(".entrada").length - 1].value;

                    var mensaje = document.createElement("div");
                    mensaje.className = "mensaje";
                    mensaje.innerHTML = "<p class='texto'>Tú: " + valorEntrada + "</p>";
                    conversacion.appendChild(mensaje);
                    conversacion.scrollTop = conversacion.scrollTop + 1000;

                    if (valorEntrada == "1") {
                        var respuesta2 = ">>Ya veo. Porfavor intenta volver a conectarte a internet en la parte inferior derecha de tu pantalla.(Coloca un número: 1.Ya lo intenté./2.No encuentro la opción de conexión a internet.)";
                        var mensaje2 = document.createElement("div");
                        mensaje2.className = "mensaje";
                        mensaje2.innerHTML = "<p class='texto'>" + respuesta2 + "</p>";
                        conversacion.appendChild(mensaje2);
                        conversacion.scrollTop = conversacion.scrollTop + 1000;

                        agregarCajaTextoYBoton();

                        document.querySelectorAll(".enviar")[document.querySelectorAll(".enviar").length - 1].addEventListener("click", function () {
                            var valorEntrada2 = document.querySelectorAll(".entrada")[document.querySelectorAll(".entrada").length - 1].value;

                            var mensaje3 = document.createElement("div");
                            mensaje3.className = "mensaje";
                            mensaje3.innerHTML = "<p class='texto'>Tú: " + valorEntrada2 + "</p>";
                            conversacion.appendChild(mensaje3);
                            conversacion.scrollTop = conversacion.scrollTop + 1000;

                            if (valorEntrada2 == "1") {
                                var respuesta3 = ">>🔧 Okay, entonces te brindaré el acceso al formulario de Incidencia Técnica: <a href='https://visitante1204.github.io/Helpdesk/form.html'>https://visitante1204.github.io/Helpdesk/form.html</a>";
                                var mensaje4 = document.createElement("div");
                                mensaje4.className = "mensaje";
                                mensaje4.innerHTML = "<p class='texto'>" + respuesta3 + "</p>";
                                conversacion.appendChild(mensaje4);
                                conversacion.scrollTop = conversacion.scrollTop + 1000;
                            } else if (valorEntrada2 == "2") {
                                var respuesta3 = ">>Se encuentra cerca del ícono de sonido del sistema. Haz click en él, y a continuación pulsa primero en Desconectar(Si estás conectado), y luego en Conectar. ¿Te funcionó? (Coloca un número: 1.Sí/2.No )";
                                var mensaje4 = document.createElement("div");
                                mensaje4.className = "mensaje";
                                mensaje4.innerHTML = "<p class='texto'>" + respuesta3 + "</p>";
                                conversacion.appendChild(mensaje4);
                                conversacion.scrollTop = conversacion.scrollTop + 1000;

                                agregarCajaTextoYBoton();

                                document.querySelectorAll(".enviar")[document.querySelectorAll(".enviar").length - 1].addEventListener("click", function () {
                                    var valorEntrada3 = document.querySelectorAll(".entrada")[document.querySelectorAll(".entrada").length - 1].value;

                                    var mensaje5 = document.createElement("div");
                                    mensaje5.className = "mensaje";
                                    mensaje5.innerHTML = "<p class='texto'>Tú: " + valorEntrada3 + "</p>";
                                    conversacion.appendChild(mensaje5);
                                    conversacion.scrollTop = conversacion.scrollTop + 1000;

                                    if (valorEntrada3 == "1") {
                                        var respuesta4 = ">>Okay, espero haberte ayudado.";
                                        var mensaje6 = document.createElement("div");
                                        mensaje6.className = "mensaje";
                                        mensaje6.innerHTML = "<p class='texto'>" + respuesta4 + "</p>";
                                        conversacion.appendChild(mensaje6);
                                        conversacion.scrollTop = conversacion.scrollTop + 1000;
                                    } else if (valorEntrada3 == "2") {
                                        var respuesta4 = ">>🔧 Okay, entonces te brindaré el acceso al formulario de Incidencia Técnica: <a href='https://visitante1204.github.io/Helpdesk/form.html'>https://visitante1204.github.io/Helpdesk/form.html</a>";
                                        var mensaje6 = document.createElement("div");
                                        mensaje6.className = "mensaje";
                                        mensaje6.innerHTML = "<p class='texto'>" + respuesta4 + "</p>";
                                        conversacion.appendChild(mensaje6);
                                        conversacion.scrollTop = conversacion.scrollTop + 1000;
                                    } else {
                                        var respuesta4 = ">>Por favor, ingrese una opción correcta.(Sólo ingrese 1 o 2.)";
                                        var mensaje6 = document.createElement("div");
                                        mensaje6.className = "mensaje";
                                        mensaje6.innerHTML = "<p class='texto'>" + respuesta4 + "</p>";
                                        conversacion.appendChild(mensaje6);
                                        conversacion.scrollTop = conversacion.scrollTop + 1000;
                                    }
                                });
                            }
                        });
                    } else if (valorEntrada == "2") {
                        var respuesta2 = ">>🔧 Okay, entonces te brindaré el acceso al formulario de Incidencia Técnica: <a href='https://visitante1204.github.io/Helpdesk/form.html'>https://visitante1204.github.io/Helpdesk/form.html</a>";
                        var mensaje2 = document.createElement("div");
                        mensaje2.className = "mensaje";
                        mensaje2.innerHTML = "<p class='texto'>" + respuesta2 + "</p>";
                        conversacion.appendChild(mensaje2);
                        conversacion.scrollTop = conversacion.scrollTop + 1000;
                        document.querySelectorAll(".entrada")[document.querySelectorAll(".entrada").length - 1].remove();
                        document.querySelectorAll(".enviar")[document.querySelectorAll(".enviar").length - 1].remove();
                    } else {
                        var respuesta2 = "Por favor, ingrese una opción correcta.(Sólo ingrese 1 o 2.)";
                        var mensaje2 = document.createElement("div");
                        mensaje2.className = "mensaje";
                        mensaje2.innerHTML = "<p class='texto'>" + respuesta2 + "</p>";
                        conversacion.appendChild(mensaje2);
                        conversacion.scrollTop = conversacion.scrollTop + 1000;
                    }
                });
                break;

            case "3":
                var respuesta = ">>🔧 En el siguiente link de acceso podrás incluir los detalles de tu Incidencia: <a href='https://visitante1204.github.io/Helpdesk/form.html'>https://visitante1204.github.io/Helpdesk/form.html</a>";
                var mensaje = document.createElement("div");
                mensaje.className = "mensaje";
                mensaje.innerHTML = "<p class='texto'>" + respuesta + "</p>";
                conversacion.appendChild(mensaje);
                conversacion.scrollTop = conversacion.scrollTop + 1000;
                break;

            default:
                var respuesta = "Opción no válida. Por favor, elige una opción entre 1 y 3.";
                var mensaje = document.createElement("div");
                mensaje.className = "mensaje";
                mensaje.innerHTML = "<p class='texto'>" + respuesta + "</p>";
                conversacion.appendChild(mensaje);
                conversacion.scrollTop = conversacion.scrollTop + 1000;
                agregarCajaTextoYBoton();
                break;
        }
    } else {
        var respuesta = "Opción no válida. Por favor, elige una opción entre 1 y 3.";
        var mensaje = document.createElement("div");
        mensaje.className = "mensaje";
        mensaje.innerHTML = "<p class='texto'>" + respuesta + "</p>";
        conversacion.appendChild(mensaje);
        conversacion.scrollTop = conversacion.scrollTop + 1000;

        agregarCajaTextoYBoton();

        document.querySelector(".enviar").addEventListener("click", function () {
            var valorEntrada = document.querySelector(".entrada").value;
            responderOpcion(valorEntrada);
        });
    }
}

function agregarCajaTextoYBoton() {
    var conversacion = document.getElementById("conversacion");

    var entradaAnterior = conversacion.querySelector(".entrada");
    if (entradaAnterior) {
        conversacion.removeChild(entradaAnterior);
    }

    var entrada = document.createElement("input");
    entrada.type = "text";
    entrada.className = "entrada";
    entrada.style.padding = "10px";
    entrada.style.border = "1px solid #ccc";
    entrada.style.borderRadius = "5px";
    entrada.style.width = "70%";
    conversacion.appendChild(entrada);

    var botonEnviar = document.createElement("button");
    botonEnviar.className = "enviar";
    botonEnviar.innerHTML = "Enviar";
    botonEnviar.style.padding = "10px";
    botonEnviar.style.border = "none";
    botonEnviar.style.borderRadius = "5px";
    botonEnviar.style.background = "#3cb840";
    botonEnviar.style.color = "#fff";
    botonEnviar.style.cursor = "pointer";

    botonEnviar.addEventListener("click", enviarMensaje);
    entrada.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            enviarMensaje();
        }
    });
    conversacion.appendChild(botonEnviar);
}
