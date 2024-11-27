import express from 'express';
import UserLogin from '../model/user.login.model.js';
import UserRegister from '../model/user.register.model.js';
const router = express.Router();
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



// index route
router.get('/', (req, res) => {
    res.send("Hello World");
});

// home  route
router.get('/home', (req, res) => {
    res.render('home');
});

// register route
router.get('/register', (req, res) => {
    res.render('register');
});

// login route
router.get('/login', (req, res) => {
    res.render('login');
});


// register route
router.post('/register',
    body("name").trim().isLength({ min: 3 }),
    body("email").isEmail().isLength({ min: 10 }),
    body("password").isLength({ min: 5 }),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUserRegister = new UserRegister({
                name,
                email,
                password: hashedPassword,
            });
            await newUserRegister.save();

            console.log(req.body);
            res.send("Data received");
        } catch (error) {
            console.log(error);
        }
    });

// login route
router.post('/login',
    body("email").isEmail().isLength({ min: 10 }),
    body("password").isLength({ min: 5 }),
    async (req, res) => {

        // check for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // find user by email
            const user = await UserRegister.findOne({
                email,
            });

            console.log("userrrrrrrrrrrrrrrrrrrrr", user); //////////////////////////

            // if user is not found
            if (!user) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }

            // if user is found
            const isMatch = await bcrypt.compare(password, user.password);

            // if password is not matched
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }

            const token = jwt.sign({
                id: user._id,
                email: user.email,
            }, process.env.JWT_SECRET);

            res.cookie("token", token, {
                httpOnly: true,
            });
            res.render('profile');


        } catch (error) {
            console.log(error);
        }
    });


// logout route
router.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.redirect('home');
});
export default router;