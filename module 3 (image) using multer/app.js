const express = require("express");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder
app.use("/images", express.static(path.join(__dirname, "images")));

// Set Storage engine
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "images");
    },
    filename: function(req, file, cb) {
        let newfilename = "IMG" + Date.now() + "." + file.originalname.split(".").pop();
        cb(null, newfilename);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        // Accept a file
        cb(null, true);
    } else {
        // Reject a file
        // cb(null, false);
        cb(new Error("Only .jpg | .jpeg | .png files allowed."), false);
    }
};

//Init upload
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10 //max size of 10mb allowed for file uploaded
    },
    fileFilter: fileFilter
});

// ROUTES

// Index Route
app.get("/", (request, response) => response.sendFile(__dirname + "/index.html"));

// Single File Upload
app.post("/uploadimage", upload.single("myFile"), (req, res, next) => {
    const file = req.file;
    if (!file) {
        console.log("No file");
        const error = (request.fileValidationError) ? (request.fileValidationError) : (new Error("Please upload a file"));
        error.httpStatusCode = 400;
        return next(error);
    }
    console.log(file);
    res.send(`<a href = "${file.path}">${file.filename}</a>`);
});

// // Multiple Files Upload
// app.post("/uploadmultiple", upload.array("myFiles", 12), (req, res, next) => {
//     const files = req.files;
//     if (!files) {
//         const error = new Error("Please choose files");
//         error.httpStatusCode = 400;
//         return next(error);
//     }
//     res.send(files);
// });


// PORT Setup
const port = 3000;
app.listen(port, () => console.log("File Upload Module 3 server started on http://localhost:3000/"));