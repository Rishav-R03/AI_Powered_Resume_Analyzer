import jsonwebtoken from 'jsonwebtoken'
import User from '../models/Users.model.js'


// middleware to protect routes 

export const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (token && token.startsWith("Bearer")) {
            token = token.split(" ")[1];
            const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next()
        } else {
            res.status(401).json({ message: "Not authorized, no token." })
        }
    } catch (err) {
        console.log("Unable to authorize", err.message)
        return res.status(400).json({ message: "Token failed", err: message })
    }
}

export default protect;