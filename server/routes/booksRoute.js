const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Books = require("../models/booksModel");

//add a Book
router.post("/add-book", authMiddleware, async (req, res) => {
    try {
        const newBook = new Books(req.body);
        await newBook.save();
        return res.send({
            success: true,
            message: "Book added successfully"
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        });
    }
});

//update book
router.put("/update-book/:id", authMiddleware, async (req, res) => {
    try {
        await Books.findByIdAndUpdate(req.params.id, req.body);
        return res.send({
            success: true,
            message: "Book updated successfully"
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        });
    }
});

//delete a book
router.delete("/delete-book/:id", authMiddleware, async (req, res) => {
    try {
        await Books.findByIdAndDelete(req.params.id);
        return res.send({
            success: true,
            message: "Book deleted successfully"
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        });
    }
});

//get all books
router.get("/get-all-books", authMiddleware, async (req, res) => {
    try {
        const books = await Books.find().sort({createdAt: -1});
        return res.send({
            success: true,
            data: books
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        });
    }
});


//get book by id
router.get("/get-book-by-id/:id", authMiddleware, async (req, res) => {
    try {
        const book = await Books.findById(req.params.id);
        return res.send({
            success: true,
            data: book
        });
    } catch (error) {
        return res.send({
            success: false,
            message: error.message
        });
    }
});


module.exports = router;