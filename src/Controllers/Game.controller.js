
import Game from "../Models/game.model.js";
import Jwt from "jsonwebtoken";


export const newgame = async (req, res) => {

          const token = req.header("auth-token")
          const decoded = Jwt.decode(token);

          try {
                    const game = new Game({
                              user: decoded._id,
                    })
                    await game.save()
                    res.status(200).json({ game });
          } catch (error) {
                    res.status(500).json({ error: error })
          }

};
