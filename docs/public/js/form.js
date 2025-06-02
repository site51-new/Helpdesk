const formulario = document.querySelector('form');
formulario.addEventListener('submit', (e) => {
    const comentarios = document.getElementById('comentarios');
    if (comentarios.value.includes('\n')) {
        e.preventDefault();
        alert('La descripción corta del problema solo debe tener una línea.');
    } else if (!formulario.checkValidity()) {
        e.preventDefault();
        alert('Por favor, complete todos los campos requeridos correctamente.');
    } else {
        e.preventDefault();
        // formulario.reset(); // Descomentar línea para limpiar el formulario después de enviar
    }
});
