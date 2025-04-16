
const jwt = require("jsonwebtoken");

const SECRET_KEY = "12345aA@"; 

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

    if (!token) {
        return res.status(401).json({ message: "Bạn chưa đăng nhập hoặc token không hợp lệ!" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token đã hết hạn!" });
            }
            return res.status(403).json({ message: "Token không hợp lệ!" });
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
