import Point from "../Models/point.model.js";
import Jwt from "jsonwebtoken";

export const getPointsByGame = async (req, res) => {
    console.log("Request received at getPointsByGame");
    const gameId = req.params.game;
    const token = req.header("auth-token")
    const decoded = Jwt.decode(token);

    try {
        const points = await Point.find({ gameId }).populate('userId optionId').exec();

        if (!points.length) {
            console.log(`No points found for game ID: ${gameId}`);
            return res.status(404).json({ message: "No points found for this game." });
        }

        console.log(`Points found for game ID: ${gameId}`);
        res.status(200).json(points);
    } catch (error) {
        console.error(`Error fetching points for game ID: ${gameId} - ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};
