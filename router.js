const express = require("express");
const router = express.Router();
const newBookes = require("../Model/Schema");

router.post("/", async (req, res) => {
    try {
        const { title, author, category } = req.body;
        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }
        const book = await newBookes.create({
            title,
            author,
            category
        });
        res.status(201).json({
            message: "Book added successfully",
            book
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


router.get("/", async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.max(1, parseInt(req.query.limit) || 5);
        const skip = (page - 1) * limit;
        const books = await newBookes
            .find()
            .skip(skip)
            .limit(limit);

        const totalBooks = await newBookes.countDocuments();
            res.status(200).json({
            currentPage: page,
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit),
            books
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const { availability } = req.body;
        if (typeof availability !== "boolean") {
            return res.status(400).json({
                message: "Availability must be true or false"
            });
        }
        const book = await newBookes.findByIdAndUpdate(
            req.params.id,
            { availability },
            { new: true, runValidators: true }
        );
        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }
        res.status(200).json({
            message: "Book availability updated successfully",
            book
        });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid book ID"
            });
        }
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;