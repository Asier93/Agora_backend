import Point from "../Models/point.model.js";
import Jwt from "jsonwebtoken";
import axios from "axios";

export const getPointsByGame = async (req, res) => {
  const gameId = req.params.game;
  const token = req.header("auth-token");
  const decoded = Jwt.decode(token);

  try {
    const points = await Point.find({ gameId }).populate("optionId").exec();

    if (!points.length) {
      return res
        .status(404)
        .json({ message: "No points found for this game." });
    }

    const adjectives = [];

    points.forEach((point) => {
      if (point.value === 1) {
        const adjective = point.optionId.name.trim();
        if (!adjectives.includes(adjective)) {
          adjectives.push(adjective);
        }
      }
    });

    if (adjectives.length === 0) {
      return res
        .status(404)
        .json({ message: "No adjectives with value 1 found." });
    }

    try {
      const response = await axios.get(
        `https://webextendida.es/chatProdBechiara1.php?question=${encodeURIComponent(
          adjectives.join(" ")
        )}`
      );
      res.status(200).json({ adjectives, serverResponse: response.data });
    } catch (error) {
      console.error("Error al hacer la solicitud al servidor:", error.message);
      return res
        .status(500)
        .json({ error: "Error al obtener el personaje mitológico." });
    }
  } catch (error) {
    console.error(
      `Error fetching points for game ID: ${gameId} - ${error.message}`
    );
    res.status(500).json({ error: error.message });
  }
};
