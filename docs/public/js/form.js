const formulario = document.getElementById('incidenciaForm');

formulario.addEventListener('submit', (e) => {
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
        id: 'INC-' + Date.now(),
        fecha: new Date().toLocaleString(),
        email: formulario.email.value.trim(),
        apellido1: formulario.apellido1.value.trim(),
        apellido2: formulario.apellido2.value.trim(),
        nombres: formulario.nombres.value.trim(),
        dni: formulario.dni.value.trim(),
        sede: formulario.sede.value,
        categoria: formulario.categoria.value,
        tipo_dispositivo: formulario.tipo_dispositivo.value,
        codigo_bien: formulario.codigo_bien.value.trim(),
        comentarios,
        marca: formulario.marca.value.trim(),
        modelo: formulario.modelo.value.trim(),
        tecnicoAsignado: "",
        estado: "PENDIENTE"
    };

    let incidencias = JSON.parse(localStorage.getItem('incidencias')) || [];
    incidencias.push(incidencia);
    localStorage.setItem('incidencias', JSON.stringify(incidencias));

    alert('✅ Incidencia registrada correctamente.');

    formulario.reset();
});
