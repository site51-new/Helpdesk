const BASE_URL = 'https://mi-api-helpdesk.onrender.com';

const opcionesPorCategoria = {
    "EQUIPOS DE CÓMPUTO": [
        { value: "TECLADO", text: "TECLADO" },
        { value: "MONITOR", text: "MONITOR" },
        { value: "CPU", text: "CPU" },
        { value: "IMPRESORA", text: "IMPRESORA" }
    ],
    "REDES": [
        { value: "SWITCH", text: "SWITCH" },
        { value: "ROUTER", text: "ROUTER" }
    ],
    "RADIOENLACES": [
        { value: "RADIOENLACE", text: "RADIOENLACE" }
    ],
    "CÁMARAS DE VIGILANCIA": [
        { value: "CAMARA", text: "CÁMARA" }
    ],
    "DISPOSITIVOS DE ENTRADA/SALIDA": [
        { value: "OTROS", text: "DISPOSITIVOS DE ENTRADA, SALIDA U OTROS (Consejos)" }
    ]
};

const todasOpciones = [
    { value: "TECLADO", text: "TECLADO" },
    { value: "MONITOR", text: "MONITOR" },
    { value: "CPU", text: "CPU" },
    { value: "IMPRESORA", text: "IMPRESORA" },
    { value: "SWITCH", text: "SWITCH" },
    { value: "ROUTER", text: "ROUTER" },
    { value: "RADIOENLACE", text: "RADIOENLACE" },
    { value: "CAMARA", text: "CÁMARA" },
    { value: "OTROS", text: "DISPOSITIVOS DE ENTRADA, SALIDA U OTROS (Consejos)" }
];

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('incidenciaForm');
    const categoriaSelect = document.getElementById('categoria');
    const tipoDispositivoSelect = document.getElementById('tipo_dispositivo');
    const mensajeError = document.getElementById('mensaje-error');

    function actualizarTipoDispositivo() {
        const categoriaSeleccionada = categoriaSelect.value;
        tipoDispositivoSelect.innerHTML = '';

        const opcionesHabilitadas = opcionesPorCategoria[categoriaSeleccionada] || [];

        todasOpciones.forEach(opcion => {
            const optionElem = document.createElement('option');
            optionElem.value = opcion.value;
            optionElem.textContent = opcion.text;

            if (opcionesHabilitadas.find(o => o.value === opcion.value)) {
                optionElem.disabled = false;
                optionElem.style.paddingLeft = '0';
            } else {
                optionElem.disabled = true;
                optionElem.style.paddingLeft = '20px';
            }
            tipoDispositivoSelect.appendChild(optionElem);
        });

        const primeraHabilitada = opcionesHabilitadas[0];
        tipoDispositivoSelect.value = primeraHabilitada ? primeraHabilitada.value : '';
    }

    actualizarTipoDispositivo();

    categoriaSelect.addEventListener('change', actualizarTipoDispositivo);

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();

        mensajeError.textContent = '';
        mensajeError.style.color = 'black';

        const comentarios = document.getElementById('comentarios').value.trim();
        if (comentarios.includes('\n')) {
            mensajeError.textContent = 'La descripción corta del problema solo debe tener una línea.';
            mensajeError.style.color = 'red';
            return;
        }

        if (!formulario.checkValidity()) {
            mensajeError.textContent = 'Por favor, complete todos los campos requeridos correctamente.';
            mensajeError.style.color = 'red';
            return;
        }

        const incidencia = {
            Id_Dependencia: formulario['sede'] ? formulario['sede'].value : null,
            categoria: formulario.categoria.value,
            tipo_dispositivo: formulario.tipo_dispositivo.value,
            marca: formulario.marca.value.trim(),
            modelo: formulario.modelo.value.trim() || null,
            glosa: comentarios,
            tecnico_encargado: null,
            estado_incidencia: "PENDIENTE",
            fechayhora: new Date().toISOString(),
            codigo_del_bien: formulario.codigo_bien.value.trim()
        };

        const token = localStorage.getItem('token');
        if (!token) {
            mensajeError.textContent = 'No estás autenticado. Por favor, inicia sesión.';
            mensajeError.style.color = 'red';
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/api/incidencias`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(incidencia)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Detalles del error:', errorData);
                mensajeError.textContent = `Error al registrar incidencia: ${errorData.mensaje || 'Error desconocido'}`;
                mensajeError.style.color = 'red';
                return;
            }

            mensajeError.textContent = '✔️ Incidencia registrada correctamente.';
            mensajeError.style.color = 'green';

            formulario.reset();
            actualizarTipoDispositivo();

            window.dispatchEvent(new CustomEvent('incidenciaCreada'));

        } catch (error) {
            console.error('Error al enviar incidencia:', error);
            mensajeError.textContent = 'Error al registrar incidencia. Por favor intente más tarde.';
            mensajeError.style.color = 'red';
        }
    });
});
