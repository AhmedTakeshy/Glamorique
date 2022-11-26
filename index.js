import express, { urlencoded } from "express";
import ejs from "ejs";
import path from "path";
import mongoose from "mongoose";
import methodOverride from "method-override";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

connect("mongodb://localhost:27017/exclusv", {});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.get("/", (req, res) => {
  res.render("Home");
});

app.get("/about", (req, res) => {
  res.render("About");
});

app.listen(3000, () => {
  console.log("Connection up and running");
});
