import express from "express";
import { home } from "../controllers/fakeApiController.js"


const fakeRouter = express.Router()

fakeRouter.get("/", home)

export default fakeRouter;
