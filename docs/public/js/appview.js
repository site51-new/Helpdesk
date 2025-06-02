const botonImagen = document.getElementById('boton-imagen');
const panelMensaje = document.getElementById('panel-mensaje');

botonImagen.addEventListener('click', () => {
    panelMensaje.style.display = panelMensaje.style.display === 'block' ? 'none' : 'block';
});
