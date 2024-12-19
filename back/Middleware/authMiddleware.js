const jwt = require("jsonwebtoken");



const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Récupérer le token du header
    if (!token) {
        return res.status(401).json({ message: "Accès non autorisé, token manquant." });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Token invalide." });
    }
};

module.exports = authMiddleware;