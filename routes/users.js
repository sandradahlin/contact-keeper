const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const encryptPassword = require("../services/encryptPassword");

const User = require("../models/User");

router.get("/", async (req, res) => {
    let users = await User.find();
    res.json({ users });
});

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
    "/",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check(
            "password",
            "Please enter a password with 6 or more characters"
        ).isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // res.send("passed");

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email: email });
            if (user) {
                return res.status(400).json({ msg: "User already exists." });
            }
            user = new User({
                name,
                email,
                password
            });

            user.password = await encryptPassword(password);

            await user.save();
            // res.send("User registered");

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                {
                    expiresIn: 3600000
                },
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
