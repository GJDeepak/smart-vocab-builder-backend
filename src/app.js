import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import wordRoutes from "./routes/word.routes.js";

import errorMiddleware from "./middleware/error.middleware.js";
import notFound from "./middleware/notFound.middleware.js";

const app = express();

app.use(cors());
// app.use(
//   cors({ origin: "http://localhost:5173", credentials: true })
// );

// app.use(
//   cors({ origin: "*" })
// );

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Vocabulary Builder API Running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/words", wordRoutes);


app.use(notFound);
app.use(errorMiddleware);

export default app;