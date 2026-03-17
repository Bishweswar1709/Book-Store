import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Routes for save a new book
router.post("/", async (req, res) => {
    try {
        const { title, author, publishYear } = req.body;

        if (!title || !author || !publishYear) {
            return res.status(400).send("All fields are required");
        }

        const newBook = await Book.create({
            title,
            author,
            publishYear
        });

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Error occurred while saving the book");
    }
});

//Route for get all books from DB
router.get("/", async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Error occurred while saving the book");
    }
});

//Route for get all books from DB by id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).send("Book not found");
        }
        return res.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Error occurred while fetching the book");
    }
});

//route for update a book by id
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, publishYear } = req.body;

        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, author, publishYear },
            { returnDocument: "after" }
        );

        if (!updatedBook) {
            return res.status(404).send({
                message: "Book not found"
            });
        }

        return res.status(200).send({
            message: "Book updated successfully",
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: "Error updating book"
        });
    }
});

//delete a book by id
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).send("Book not found");
        }
        return res.status(200).send({
            message: "Book deleted successfully"
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send("Error occurred while deleting the book");
    }
});

export default router;