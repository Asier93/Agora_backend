import Jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      return res.status(401).json({ message: "Acceso denegado" });
    }

    const verified = Jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.error("Error de autenticación:", error);
    return res.status(401).json({ message: "Acceso denegado" });
  }
};

export default verifyToken;
