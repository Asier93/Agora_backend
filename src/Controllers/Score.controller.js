import Point from "../Models/point.model.js";
import Jwt from "jsonwebtoken";
import axios from "axios";

export const getPointsByGame = async (req, res) => {
    console.log("Request received at getAdjectivesByGame");

    const gameId = req.params.game;  // Extraer gameId de los parámetros de la solicitud
    const token = req.header("auth-token");  // Extraer token del encabezado de la solicitud
    const decoded = Jwt.decode(token);  // Decodificar el token

    try {
        const points = await Point.find({ gameId }).populate('optionId').exec();  // Buscar puntos en la base de datos y poblar 'optionId'

        if (!points.length) {
            console.log(`No points found for game ID: ${gameId}`);
            return res.status(404).json({ message: "No points found for this game." });
        }

        console.log(`Points found for game ID: ${gameId}`);

        const adjectives = [];  // Array para almacenar adjetivos únicos

        points.forEach(point => {
            console.log(`Point value: ${point.value}, Option name: ${point.optionId.name}`);
            if (point.value === 1) {  // Filtrar puntos con valor 1
                const adjective = point.optionId.name.trim();  // Extraer nombre del adjetivo
                if (!adjectives.includes(adjective)) {
                    adjectives.push(adjective);  // Añadir adjetivo al array si no está ya presente
                }
            }
        });

        console.log(`Adjectives with value 1: ${adjectives}`);

        // Verificar si hay adjetivos antes de hacer la solicitud GET
        if (adjectives.length === 0) {
            console.log('No adjectives with value 1 found.');
            return res.status(404).json({ message: "No adjectives with value 1 found." });
        }

        // Hacer solicitud GET al servidor con los adjetivos
        try {
            const response = await axios.get(`https://webextendida.es/chatProdBechiara1.php?question=${encodeURIComponent(adjectives.join(' '))}`);
            console.log('Respuesta del servidor:', response.data);
            res.status(200).json({ adjectives, serverResponse: response.data });
        } catch (error) {
            console.error('Error al hacer la solicitud al servidor:', error.message);
            // Manejar el error y responder adecuadamente
            return res.status(500).json({ error: 'Error al obtener el personaje mitológico.' });
        }
    } catch (error) {
        console.error(`Error fetching points for game ID: ${gameId} - ${error.message}`);
        res.status(500).json({ error: error.message });  // Responder con el mensaje de error
    }
};
