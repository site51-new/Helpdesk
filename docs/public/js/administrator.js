document.addEventListener('DOMContentLoaded', () => {
    const cuerpoTabla = document.getElementById('cuerpoTabla');
    const btnGrabar = document.getElementById('btnGrabar');
    const btnCancelar = document.getElementById('btnCancelar');
    const lugarFiltro = document.getElementById('lugarIncidencia');
    const estadoFiltro = document.getElementById('EstadoIncidencia');

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
        const estadoLower = estado.toLowerCase().replace(/\s/g, '');
        return `
            <div class="imagen-container">
                <img src="/img/${estadoLower}.png" alt="${estado}" />
                <div>${estado}</div>
            </div>
        `;
    }

    function cargarIncidencias() {
        cuerpoTabla.innerHTML = '';
        const incidencias = JSON.parse(localStorage.getItem('incidencias')) || [];

        incidencias.forEach(inc => {
            const tr = document.createElement('tr');

            const selectTecnico = document.createElement('select');
            selectTecnico.classList.add('select-tecnico');
            selectTecnico.dataset.id = inc.id;

            tecnicosDisponibles.forEach(t => {
                const option = document.createElement('option');
                option.value = t.value;
                option.textContent = t.text;
                if (inc.tecnicoAsignado === t.value) option.selected = true;
                selectTecnico.appendChild(option);
            });

            const tdEstado = document.createElement('td');
            tdEstado.classList.add('td-estado');
            tdEstado.dataset.id = inc.id;
            tdEstado.innerHTML = obtenerImagenEstado(inc.estado);

            tr.innerHTML = `
                <td>${inc.fecha}</td>
                <td>${inc.id}</td>
                <td>${inc.sede}</td>
                <td>${inc.categoria}</td>
                <td>${inc.comentarios}</td>
            `;

            const tdTecnico = document.createElement('td');
            tdTecnico.appendChild(selectTecnico);
            tr.appendChild(tdTecnico);
            tr.appendChild(tdEstado);

            cuerpoTabla.appendChild(tr);
        });

        actualizarDisponibilidadTecnicos();
        agregarEventoCambioTecnico();
    }

    function agregarEventoCambioTecnico() {
        const selectsTecnico = document.querySelectorAll('.select-tecnico');
        selectsTecnico.forEach(select => {
            select.addEventListener('change', () => {
                const id = select.dataset.id;
                const estadoTd = document.querySelector(`td.td-estado[data-id="${id}"]`);

                if (select.value === "") {
                    estadoTd.innerHTML = obtenerImagenEstado("ATENDIDO");
                } else {
                    estadoTd.innerHTML = obtenerImagenEstado("EN PROCESO");
                }

                actualizarDisponibilidadTecnicos();
            });
        });
    }

    function grabarFormulario(event) {
        event.preventDefault();
        const incidencias = JSON.parse(localStorage.getItem('incidencias')) || [];

        const selectsTecnico = document.querySelectorAll('.select-tecnico');

        selectsTecnico.forEach(select => {
            const id = select.dataset.id;
            const incidencia = incidencias.find(inc => inc.id === id);
            if (incidencia) {
                incidencia.tecnicoAsignado = select.value;
                incidencia.estado = select.value === "" ? "ATENDIDO" : "EN PROCESO";
            }
        });

        localStorage.setItem('incidencias', JSON.stringify(incidencias));
        alert('✅ Cambios guardados correctamente.');
        cargarIncidencias();
    }

    function cancelarFormulario(event) {
        event.preventDefault();
        if (confirm('¿Está seguro que desea cancelar los cambios no guardados?')) {
            cargarIncidencias();
            lugarFiltro.value = "";
            estadoFiltro.value = "";
            filtrarIncidencias();
        }
    }

    function filtrarIncidencias() {
        const lugar = lugarFiltro.value.toUpperCase();
        const estado = estadoFiltro.value.toUpperCase();

        const filas = cuerpoTabla.querySelectorAll('tr');

        filas.forEach(fila => {
            const sede = fila.children[2].textContent.toUpperCase();
            const estadoActualTexto = fila.children[6].innerText.trim().toUpperCase();

            const matchLugar = lugar === "" || sede.includes(lugar);
            const matchEstado = estado === "" || estadoActualTexto === estado;

            fila.style.display = (matchLugar && matchEstado) ? '' : 'none';
        });
    }

    function actualizarDisponibilidadTecnicos() {
        const selectsTecnico = document.querySelectorAll('.select-tecnico');
        const asignados = new Set();

        selectsTecnico.forEach(select => {
            if (select.value) asignados.add(select.value);
        });

        selectsTecnico.forEach(select => {
            const actual = select.value;
            Array.from(select.options).forEach(option => {
                if (option.value === actual || option.value === "") {
                    option.disabled = false;
                } else {
                    option.disabled = asignados.has(option.value);
                }
            });
        });
    }

    lugarFiltro.addEventListener('change', filtrarIncidencias);
    estadoFiltro.addEventListener('change', filtrarIncidencias);
    btnGrabar.addEventListener('click', grabarFormulario);
    btnCancelar.addEventListener('click', cancelarFormulario);

    cargarIncidencias();
});
