import express from "express";
import bookRouter from "./book/bookRouter";
import globalErrorHandler from "./middlewares/globalErrorHandlers";
import userRouter from "./user/userRouter";

const app = express();
app.use(express.json());

// Routes
// Http methods:- GET, POST, PUT, PATCH, DELETE
app.get("/", (req, res, next) => {
  res.json({ message: "Welcome to elib apis" });
});

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

// global error handler
app.use(globalErrorHandler);

export default app;
