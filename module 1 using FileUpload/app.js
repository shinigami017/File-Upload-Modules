const express = require('express');
var app = express();
var upload = require('express-fileupload');

app.use(upload()); // configure middleware



app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})
app.post('/upload', function(req, res) {
    console.log(req.files);
    if (req.files) {
        var file = req.files.upfile,
            name = file.name,
            type = file.mimetype;
        var uploadpath = __dirname + '/uploads/' + name;
        file.mv(uploadpath, function(err) {
            if (err) {
                console.log("File Upload Failed", name, err);
                res.send("Error Occured!")
            } else {
                console.log("File Uploaded", name);
                res.send('Done! Uploading files')
            }
        });
    } else {
        alert("No File selected !");
        res.redirect("/");
    };
})

// Port Setup
app.set("port", (process.env.PORT || 3000));
app.listen(app.get("port"), function() {
    console.log("Server started on port " + app.get("port") + "!");
    console.log("Press Ctrl + C to stop the server.");
});