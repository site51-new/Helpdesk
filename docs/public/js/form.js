document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('incidenciaForm');

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
            const response = await fetch('/api/incidencias', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(incidencia)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Detalles del error:', errorData);
                throw new Error(errorData.mensaje + (errorData.detalles ? ' - ' + errorData.detalles : ''));
            }

            alert('✔️ Incidencia registrada correctamente.');

            formulario.reset();

            window.dispatchEvent(new CustomEvent('incidenciaCreada'));

        } catch (error) {
            console.error('Error al enviar incidencia:', error);
            alert(`Ocurrió un error al registrar la incidencia: ${error.message}`);
        }
    });
});
