const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const User = require("../models/User");

// @route   GET api/users
// @desc    Get logged in user
// @access  Private
//for private routes we need to send in a token - auth middleware
router.get("/", auth, async (req, res) => {
    // res.send("Get logged in user");
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json({ user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   POST api/users
// @desc    Get logged in user/authentication
// @access  Public
router.post(
    "/",
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // res.send("Log in user");
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }

            const isMatchPassword = await bcrypt.compare(
                password,
                user.password
            );
            if (!isMatchPassword) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;
