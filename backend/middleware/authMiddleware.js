const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded token data to `req`
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
};
exports.isAdmin = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};
