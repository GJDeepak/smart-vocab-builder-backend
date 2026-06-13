import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },

  word: { type: String, required: true, trim: true, lowercase: true },

  definition: { type: String, required: true },

  example: { type: String, default: "" },

  nextReviewDate: { type: Date, default: Date.now, index: true },

  reviewCount: { type: Number, default: 0 },
}, {
  timestamps: true,
});

// wordSchema.index({
//   userId: 1,
//   word: 1,
// });

// make it unique to prevent duplicate words for the same user
wordSchema.index({
  userId: 1,
  word: 1,
}, { 
  unique: true 
});

const Word = mongoose.model("Word", wordSchema);

export default Word;