import express from "express";
import multer from "multer";
import path from "path";
import { createBook, updateBook } from "./bookController";
import authenticate from "./../middlewares/authenticate";

const bookRouter = express.Router();

const upload = multer({
  // file store local -->
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 3e7 }, // 30mb
});

// routes
bookRouter.post(
  "/",
  authenticate,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);

bookRouter.patch(
  "/:bookId",
  authenticate,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  updateBook
);

export default bookRouter;
