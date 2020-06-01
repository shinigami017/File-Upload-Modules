const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Set Storage engine
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'files');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

//Init upload
var upload = multer({ storage: storage });

// ROUTES

// Index Route
app.get("/", (request, response) => response.sendFile(__dirname + "/index.html"));

// Single File Upload
app.post("/uploadfile", upload.single("myFile"), (req, res, next) => {
    const file = req.file;
    if (!file) {
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(file);
});

// Multiple Files Upload
app.post("/uploadmultiple", upload.array("myFiles", 12), (req, res, next) => {
    const files = req.files;
    if (!files) {
        const error = new Error("Please choose files");
        error.httpStatusCode = 400;
        return next(error);
    }
    res.send(files);
});


// PORT Setup
const port = 3000;
app.listen(port, () => console.log("File Upload Module 2 server started on port 3000!"));