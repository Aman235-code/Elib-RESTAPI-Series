import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandlers";
import userRouter from "./user/userRouter";

const app = express();

// Routes
// Http methods:- GET, POST, PUT, PATCH, DELETE
app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to elib apis" });
});

app.use("/api/users", userRouter);

// global error handler
app.use(globalErrorHandler);

export default app;
