//jshint esversion:6
const mongoose=require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todoListDB",{useNewUrlParser:true});

const itemSchema={
  name:String
};
const item=mongoose.model("item",itemSchema);
const item1=new item({
  name:"welcome to todoList"
});
const item2=new item({
  name:"Hit the + button"
});
const item3=new item({
  name:"welcome"
});
const defaultItems=[item1,item2,item3];
app.get("/", function(req, res) {
  item.find({},function(err,foundItems){
    if(foundItems.length===0){
      item.insertMany(defaultItems,function(err){
        if(err)
        console.log(err);
        else
        console.log("success");
      });
      res.direct("/");
    }
    else{
      const day = date.getDate();
        res.render("list", {listTitle: day, newListItems1: foundItems});
    }
  });
});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
const item5=new item({
  name:itemName
});
item5.save();
res.redirect("/");
});

app.post("/delete",function(req,res){
  const checkitem=req.body.checkbox;
  item.findByIdAndRemove(checkitem,function(err){
    if(err)
    console.log(err);
    else{
    console.log("success deleted");
    res.redirect("/");
  }
  });
});
app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});
let port=process.env.PORT;
 if(port==null||port==""){
   port=3000;
 }
app.listen(port, function() {
  console.log("Server started on port 3000");
});
