import Point from "../Models/point.model.js";
import Jwt from "jsonwebtoken";
import axios from "axios";

export const getPointsByGame = async (req, res) => {
    console.log("Request received at getAdjectivesByGame");
    const gameId = req.params.game;
    const token = req.header("auth-token");
    const decoded = Jwt.decode(token);

    try {
        const points = await Point.find({ gameId }).populate('optionId').exec();

        if (!points.length) {
            console.log(`No points found for game ID: ${gameId}`);
            return res.status(404).json({ message: "No points found for this game." });
        }

        console.log(`Points found for game ID: ${gameId}`);
        
        // Array para almacenar los adjetivos únicos
        const adjectives = [];

        // Iterar sobre los puntos y extraer los adjetivos
        points.forEach(point => {
            const adjective = point.optionId.name.trim(); // Suponiendo que el nombre del adjetivo está en el campo 'name'
            if (!adjectives.includes(adjective)) {
                adjectives.push(adjective);
            }
        });

        // Hacer solicitud GET al servidor con los adjetivos
        try {
            const response = await axios.get(`https://webextendida.es/chatProdBechiara1.php?question=${encodeURIComponent(adjectives.join(' '))}`);
            console.log('Respuesta del servidor:', response.data);
        } catch (error) {
            console.error('Error al hacer la solicitud al servidor:', error.message);
            // Manejar el error y responder adecuadamente
            return res.status(500).json({ error: 'Error al obtener el personaje mitológico.' });
        }

        res.status(200).json(adjectives);
    } catch (error) {
        console.error(`Error fetching points for game ID: ${gameId} - ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};
