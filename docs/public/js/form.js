// IMPORTANTE: reemplaza esta URL con la de tu backend publicado
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
        if (primeraHabilitada) {
            tipoDispositivoSelect.value = primeraHabilitada.value;
        } else {
            tipoDispositivoSelect.value = '';
        }
    }

    actualizarTipoDispositivo();

    categoriaSelect.addEventListener('change', actualizarTipoDispositivo);

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();

        const comentarios = document.getElementById('comentarios').value.trim();
        if (comentarios.includes('\n')) {
            alert('La descripción corta del problema solo debe tener una línea.');
            return;
        }

        if (!formulario.checkValidity()) {
            alert('Por favor, complete todos los campos requeridos correctamente.');
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

        console.log('Datos que envío:', incidencia);

        try {
            const response = await fetch(`${BASE_URL}/api/incidencias`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(incidencia)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Detalles del error:', errorData);
                throw new Error(errorData.mensaje || 'Error desconocido');
            }

            alert('✔️ Incidencia registrada correctamente.');

            formulario.reset();
            actualizarTipoDispositivo();

            window.dispatchEvent(new CustomEvent('incidenciaCreada'));

        } catch (error) {
            console.error('Error al enviar incidencia:', error);
            alert(`Ocurrió un error al registrar la incidencia: ${error.message}`);
        }
    });
});
