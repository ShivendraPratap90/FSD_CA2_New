
const express = require("express");
const ConnectDB = require("./DB/db");
const router = require("./Router/router");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
    path: path.join(__dirname, ".env")
});

const PORT = 5000;
const app = express();
app.use(express.json());
app.use("/api/books", router);
const startServer = async () => {
    await ConnectDB();
    app.listen(PORT, () => {
        console.log("Server is running 5000");
    });
};

startServer();