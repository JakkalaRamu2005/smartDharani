
import express from "express";
import { chatWithDharani } from "../controllers/dharaniController.js";

const router = express.Router();


router.post("/chat", chatWithDharani);

export default router;
