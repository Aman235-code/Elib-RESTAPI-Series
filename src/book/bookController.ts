import { Request, NextFunction, Response } from "express";
import path from "path";
import cloudinary from "../config/cloudinary";
import createHttpError from "http-errors";
import bookModel from "./bookModel";
import fs from "fs";
const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, genre } = req.body;
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
  const filename = files.coverImage[0].filename;
  const filePath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    filename
  );

  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: filename,
      folder: "book-covers",
      format: coverImageMimeType,
    });

    const bookFileName = files.file[0].filename;
    const bookFilePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      bookFileName
    );

    const bookFileUploadResult = await cloudinary.uploader.upload(
      bookFilePath,
      {
        resource_type: "raw",
        filename_override: bookFileName,
        folder: "book-pdfs",
        format: "pdf",
      }
    );
    console.log(bookFileUploadResult);
    console.log(uploadResult);
    // @ts-ignore
    console.log(req.userId);
    const newBook = await bookModel.create({
      title,
      genre,
      author: "6640d037934dead720140446",
      coverImage: uploadResult.secure_url,
      file: bookFileUploadResult.secure_url,
    });

    // Delete temp files
    await fs.promises.unlink(filePath);
    await fs.promises.unlink(bookFilePath);

    res.status(201).json({ id: newBook._id });
  } catch (error) {
    return next(createHttpError(500, "Error While Uploading the files"));
  }
};

export { createBook };
