import express from 'express'
import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js'
import { protect } from '../middlewares/authMiddleware.js'
import upload from '../middlewares/uploadMiddleware.js'
const router = express.Router()

// auth routes 
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/profile", protect, getUserProfile);

router.post("/upload-image", upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    // You might need to adjust `req.file.name` to `req.file.filename` or `req.file.originalname`
    // depending on how your upload middleware is configured and what it returns.
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename || req.file.originalname}`;
    res.status(200).json({ imageUrl });
});

export default router;
