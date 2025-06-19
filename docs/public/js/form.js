document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('incidenciaForm');
  const dialog = document.getElementById('successDialog');
  const closeBtn = document.getElementById('closeDialog');

  closeBtn.addEventListener('click', () => dialog.close());

  formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!formulario.checkValidity()) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    const comentarios = document.getElementById('comentarios').value.trim();
    if (comentarios.includes('\n')) {
      alert('La descripción debe tener una sola línea.');
      return;
    }

    const dniUsuario = formulario.dni.value.trim();

    const incidencia = {
      id: Date.now(),
      Id_Dependencia: formulario.sede.value,
      categoria: formulario.categoria.value,
      tipo_dispositivo: formulario.tipo_dispositivo.value,
      marca: formulario.marca.value.trim(),
      modelo: formulario.modelo.value.trim(),
      glosa: comentarios,
      tecnico_encargado: null,
      estado_incidencia: 'PENDIENTE',
      fechayhora: new Date().toISOString(),
      codigo_del_bien: formulario.codigo_bien.value.trim(),
      dni_usuario: dniUsuario
    };

    // Guardar en LocalStorage
    const almacenadas = JSON.parse(localStorage.getItem('incidencias')) || [];
    almacenadas.push(incidencia);
    localStorage.setItem('incidencias', JSON.stringify(almacenadas));

    // Crear mensaje de notificación para el usuario
    const mensaje = {
      mensaje: `📬 La incidencia del dispositivo de ${incidencia.categoria} se encuentra en estado ${incidencia.estado_incidencia}.`,
      fecha: new Date().toLocaleString('es-PE')
    };

    const claveBandeja = 'bandeja_' + dniUsuario;
    const bandeja = JSON.parse(localStorage.getItem(claveBandeja)) || [];
    bandeja.push(mensaje);
    localStorage.setItem(claveBandeja, JSON.stringify(bandeja));

    dialog.showModal();
    formulario.reset();

    // Evento para recargar administrador
    window.dispatchEvent(new CustomEvent('incidenciaCreada'));
  });
});
