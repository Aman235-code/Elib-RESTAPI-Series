import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandlers";

const app = express();

// Routes
// Http methods:- GET, POST, PUT, PATCH, DELETE
app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to elib apis" });
});

// global error handler
app.use(globalErrorHandler);

export default app;
