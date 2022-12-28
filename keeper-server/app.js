//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
// const cors = require('cors');
const app = express()

app.use(express.static("public"));
app.set('view engine', 'ejs');
// app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect("mongodb://127.0.0.1:27017/keepDB", {useNewUrlParser: true});

const noteSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Note = new mongoose.model("Note", noteSchema);
function getData(note) {
  return ({title: note.title,
          content: note.content})
}
app.post("/add-note", function(req, res) {
  console.log(req.body);
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content,
  });
  newNote.save(function(err){
    if (err) {
      console.log(err)
    } else {
      console.log("Successfully upload")
    }
  });
});

app.get("/show-notes", function(req, res){
  Note.find({}, function(err, foundNotes){
    res.json(foundNotes.map(getData));
  })
});
app.listen(3001, function(){
  console.log("Server started on port 3001")
});
