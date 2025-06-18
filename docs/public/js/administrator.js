document.addEventListener('DOMContentLoaded', () => {
    const cuerpoTabla = document.getElementById('cuerpoTabla');
    const btnGrabar = document.getElementById('btnGrabar');
    const btnCancelar = document.getElementById('btnCancelar');
    const lugarFiltro = document.getElementById('lugarIncidencia');
    const estadoFiltro = document.getElementById('EstadoIncidencia');

    let incidencias = [];
    let copiaOriginalIncidencias = [];

    const tecnicosDisponibles = [
        { value: "", text: "No Asignar - Incidencia atendida" },
        { value: "Técnico 1", text: "César Mezones" },
        { value: "Técnico 2", text: "Edson Antón" },
        { value: "Técnico 3", text: "Elmer García" },
        { value: "Técnico 4", text: "Ericka Rojas" },
        { value: "Técnico 5", text: "José Torrico" },
        { value: "Técnico 6", text: "Héctor Nima" },
        { value: "Técnico 7", text: "Isaac Zegarra" },
    ];

    function obtenerImagenEstado(estado) {
        const clave = (estado || '').toLowerCase().replace(/\s/g, '');
        return `
            <div class="imagen-container">
                <img src="/img/${clave}.png" alt="${estado}" />
                <div>${estado}</div>
            </div>`;
    }

    async function cargarIncidencias() {
        cuerpoTabla.innerHTML = '';
        const resp = await fetch('/api/incidencias');
        if (!resp.ok) return console.error('No se pudieron cargar las incidencias');

        incidencias = await resp.json();
        copiaOriginalIncidencias = JSON.parse(JSON.stringify(incidencias));

        const contadorPorFecha = {};
        incidencias.forEach(inc => {
            const fecha = new Date(inc.fechayhora);
            const horaStr = fecha.toLocaleTimeString('es-PE', { hour: 'numeric', minute: '2-digit', hour12: true });

            const fStr = `${fecha.getFullYear()}${String(fecha.getMonth() + 1).padStart(2, '0')}${String(fecha.getDate()).padStart(2, '0')}`;
            contadorPorFecha[fStr] = (contadorPorFecha[fStr] || 0) + 1;
            const idVisible = `${fStr}-${contadorPorFecha[fStr]}`;

            const tr = document.createElement('tr');
            tr.dataset.idReal = inc.id_incidencia || inc.id;

            const selectTec = document.createElement('select');
            selectTec.classList.add('select-tecnico');

            tecnicosDisponibles.forEach(t => {
                const opt = new Option(t.text, t.value);
                if (inc.tecnico_encargado === t.value) opt.selected = true;
                selectTec.add(opt);
            });

            if ((inc.estado_incidencia || '').toLowerCase() === 'atendido') {
                selectTec.disabled = true;
            }

            selectTec.addEventListener('change', () => {
                inc.tecnico_encargado = selectTec.value;
                inc.estado_incidencia = selectTec.value ? 'En proceso' : 'Atendido';
                tr.querySelector('.td-estado').innerHTML = obtenerImagenEstado(inc.estado_incidencia);
                actualizarDisponibilidadTecnicos();
            });

            tr.innerHTML = `
                <td>${horaStr}</td>
                <td>${idVisible}</td>
                <td>${inc.Id_Dependencia || ''}</td>
                <td>${inc.categoria || ''}</td>
                <td>${inc.glosa || ''}</td>
            `;

            const tdTec = document.createElement('td');
            tdTec.appendChild(selectTec);

            const tdEstado = document.createElement('td');
            tdEstado.classList.add('td-estado');
            tdEstado.innerHTML = obtenerImagenEstado(inc.estado_incidencia);

            tr.appendChild(tdTec);
            tr.appendChild(tdEstado);

            cuerpoTabla.appendChild(tr);
        });

        actualizarDisponibilidadTecnicos();
        filtrarIncidencias();
    }

    function actualizarDisponibilidadTecnicos() {
        const enProceso = new Set(
            incidencias.filter(i => (i.estado_incidencia || '').toLowerCase() === 'en proceso')
                .map(i => i.tecnico_encargado)
        );

        document.querySelectorAll('.select-tecnico').forEach(select => {
            if (select.disabled) return;

            [...select.options].forEach(opt => {
                opt.disabled = opt.value && enProceso.has(opt.value) && opt.value !== select.value;
            });
        });
    }

    function filtrarIncidencias() {
        const lugar = lugarFiltro.value.trim().toLowerCase();
        const estado = estadoFiltro.value.trim().toLowerCase().replace(/\s/g, '');

        document.querySelectorAll('#cuerpoTabla tr').forEach(fila => {
            const sede = fila.cells[2]?.textContent.trim().toLowerCase();
            const estadoTexto = fila.cells[6]?.querySelector('div')?.textContent.trim().toLowerCase().replace(/\s/g, '');

            const coincideLugar = !lugar || sede === lugar;
            const coincideEstado = !estado || estadoTexto === estado;

            fila.style.display = (coincideLugar && coincideEstado) ? '' : 'none';
        });
    }

    async function grabarFormulario() {
        try {
            await Promise.all(incidencias.map(inc => {
                const id = inc.id_incidencia || inc.id;
                return fetch(`/api/incidencias/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        tecnico_encargado: inc.tecnico_encargado,
                        estado_incidencia: inc.estado_incidencia
                    })
                });
            }));
            alert('✅ Se ha guardado con éxito el estado actual de todas las incidencias.');
            cargarIncidencias();
        } catch (error) {
            alert('❌ Error al guardar los cambios.');
            console.error(error);
        }
    }

    function cancelarCambios() {
        if (!copiaOriginalIncidencias.length) return;
        incidencias = JSON.parse(JSON.stringify(copiaOriginalIncidencias));
        cargarIncidencias();
    }

    // Eventos
    btnGrabar.addEventListener('click', grabarFormulario);
    btnCancelar.addEventListener('click', cancelarCambios);
    lugarFiltro.addEventListener('change', filtrarIncidencias);
    estadoFiltro.addEventListener('change', filtrarIncidencias);

    cargarIncidencias();
});
