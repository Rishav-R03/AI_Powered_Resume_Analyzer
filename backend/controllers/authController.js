// import { User } from '../models/Users.model.js'
import bcrypt from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'
import User from '../models/Users.model.js'

// generate JWT tokens 
const generateToken = (userID) => {
    return jsonwebtoken.sign({ id: userID }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

// @desc Register a new user
// @router POST /api/auth/register
// @access Public

const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already registered!" })
        }
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user 
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl
        });

        res.status(200).json({
            message: "User created successfully",
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)
        })

    } catch (err) {
        console.log("Unable to reach server", err.message);
        return res.status(400).json({ message: "Unable to reach server" })
    }
};

// @desc Login an existing usr 
// @router POST /api/auth/login 
// @access Public 

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required!" })
        }
        if (!password) {
            return res.status(400).json({ message: "password is required!" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "Unable to find email, SignUp" });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(500).json({ message: "Invalid email or passoword" });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id)
        });
    } catch (err) {
        console.log("Unable to reach server", err.message);
        return res.status(400).json({ message: "Unable to reach server" })
    }
}

// @desc Get user profile 
// @router GET /api/auth/profile
// @access Private (Require JWT) 

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        res.json({
            user
        })
    }
    catch (err) {
        console.log("Unable to reach server", err.message);
        return res.status(400).json({ message: "Unable to reach server" })
    }

};

export { registerUser, loginUser, getUserProfile }


