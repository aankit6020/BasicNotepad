const express = require('express')
const app = express();
const fs = require("fs");
const path = require('path');


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {

    fs.readdir("./files", function (err, files) {
        res.render("index", { files: files })
    })
});
app.post('/create', function (req, res) {

    let filename = req.body.title.split(' ').join('');
    fs.writeFile(`./files/${filename}.txt`, req.body.details, function (err) { res.redirect("/") })
}
);
app.get('/files/:filename', function (req, res) {

    fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, filedata) {
        res.render("showData", { fname: req.params.filename, filedata: filedata });
    })
}
);

app.get('/edit/:filename', function (req, res) {


    res.render("edit", { filename: req.params.filename })
}) ;



app.post('/update', function (req, res) {
    fs.rename(`./files/${req.body.previousName}`,`./files/${req.body.NewName}`,function(err){
        res.redirect("/")
    })

    console.log(req.body);

})


app.listen(3000);