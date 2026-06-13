import express from "express";

import authMiddleware from "../middleware/auth.middleware.js";

import { addWord, getWords, getReviewWords, reviewWord } from "../controllers/word.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/",addWord);

router.get("/",getWords);

router.get("/review",getReviewWords);

router.patch("/:id/review",reviewWord);

export default router;