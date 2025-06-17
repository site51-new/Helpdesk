const Incidencia = require('../models/incidencia.model');

exports.obtenerOpciones = async (req, res) => {
    try {
        const opciones = [
            "1. Tengo un problema técnico(hardware) con mi equipo.",
            "2. Tengo problemas con la conexión a Internet.",
            "3. ¿Cómo puedo obtener ayuda para un problema no técnico-físico(software)?",
            "4. Salir"
        ];
        res.json(opciones);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener opciones' });
    }
};

exports.procesarOpcion = async (req, res) => {
    try {
        const opcion = req.body.opcion;
        let respuesta;
        switch (opcion) {
            case "1":
                respuesta = ">>Okay, está correctamente enchufado? (Coloca un número: 1.Sí/2.No)";
                break;
            case "2":
                respuesta = ">>Okay, ¿Usas un equipo de la institución?.(Coloca un número: 1.Uso un equipo de la institución/2.No uso un equipo de la institución)";
                break;
            case "3":
                respuesta = ">>En el siguiente link de acceso podrás incluir los detalles de tu Incidencia: LINK DE FORMULARIO";
                break;
            case "4":
                respuesta = ">>Recuerda que nos puedes encontrar en el Piso 5, Área de Soporte Técnico. ¡Lindo día😁!";
                break;
            default:
                respuesta = "Opción no válida. Por favor, elige una opción entre 1 y 4.";
        }
        res.json({ respuesta });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al procesar opción' });
    }
};
