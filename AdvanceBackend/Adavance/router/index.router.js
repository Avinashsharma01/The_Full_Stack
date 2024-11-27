import express from 'express';

const router = express.Router();

// index route
router.get('/', (req, res) => {
    res.send("Hello World");
});



export default router;