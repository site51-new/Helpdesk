const botonImagen = document.getElementById('boton-imagen');
const panelMensaje = document.getElementById('panel-mensaje');
const mensajeIncidencia = document.getElementById('mensaje-incidencia');

botonImagen.addEventListener('click', () => {
    panelMensaje.style.display = panelMensaje.style.display === 'block' ? 'none' : 'block';
});

function actualizarBandeja(incidencia) {
    const dispositivo = incidencia.tipo_dispositivo || 'dispositivo';
    const estado = incidencia.estado_incidencia || 'Pendiente';
    mensajeIncidencia.innerHTML = `<p>La incidencia del <strong>${dispositivo}</strong> se encuentra en estado <strong>${estado}</strong>.</p>`;
    botonImagen.src = '/img/ICONO_BANDEJA LLENA.png';
}

async function crearIncidencia(data) {
    try {
        const resp = await fetch('/api/incidencias', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!resp.ok) throw new Error('Error al crear incidencia');

        const incidenciaCreada = await resp.json();
        actualizarBandeja(incidenciaCreada);
    } catch (error) {
        console.error(error);
    }
}

async function checkIncidenciaUsuario() {
    try {
        const resp = await fetch('/api/mis-incidencias');
        if (!resp.ok) return;
        const incidencias = await resp.json();
        if (incidencias.length > 0) {
            actualizarBandeja(incidencias[0]);
        } else {
            mensajeIncidencia.innerHTML = '';
            botonImagen.src = '/img/ICONO_BANDEJA DE ENTRADA.png';
        }
    } catch (e) {
        console.error(e);
    }
}

document.addEventListener('DOMContentLoaded', checkIncidenciaUsuario);
