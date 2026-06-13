import dayjs from "dayjs";
import Word from "../models/Word.js";

import { fetchWordDetails } from "../services/dictionary.service.js";

export const addWord = async (req, res) => {
  try {
    const { word } = req.body;

    if (!word) {
      return res.status(400).json({ success: false, message: "Word is required" });
    }

    const existingWord = await Word.findOne({ userId: req.user._id, word: word.toLowerCase() });

    if (existingWord) {
      return res.status(400).json({ success: false, message: "This word already exists" });
    }

    const details = await fetchWordDetails(word);

    const payload = {
      userId: req.user._id,
      word: word.toLowerCase(),
      definition: details.definition,
      example: details.example 
    };

    const newWord = await Word.create(payload);

    return res.status(201).json({ success: true, data: newWord });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getWords = async (req, res) => {
  try {
    const words = await Word.find({ userId: req.user._id }).sort({ createdAt: -1 });

    return res.json({ success: true, data: words });
  } catch (error) {
    return res.status(500).json({ success: false, message:  error.message });
  }
};

export const getReviewWords = async (req, res) => {
  try {
    const words = await Word.find({
      userId: req.user._id,

      nextReviewDate: {
        $lte: new Date(),
      },
    }).sort({
      nextReviewDate: 1,
    });

    return res.json({ success: true, data: words });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const reviewWord = async (req, res) => {
  try {
    const { id } = req.params;

    const { result, devMode = false } = req.body;

    const word = await Word.findOne({ _id: id, userId: req.user._id });

    if (!word) {
      return res.status(404).json({ success: false, message: "Word not found" });
    }

    let nextReviewDate;

    if (result === "correct") {
      nextReviewDate = devMode
        ? dayjs()
            .add(3, "minute")
            .toDate()
        : dayjs()
            .add(3, "day")
            .toDate();
    } else {
      nextReviewDate = devMode
        ? dayjs()
            .add(1, "minute")
            .toDate()
        : dayjs()
            .add(1, "day")
            .toDate();
    }

    word.nextReviewDate = nextReviewDate;

    word.reviewCount += 1;

    await word.save();

    return res.json({ success: true, data: word, });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};