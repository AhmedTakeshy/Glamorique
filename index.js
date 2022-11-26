import express, { urlencoded } from "express";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

import mongoose from "mongoose";
import methodOverride from "method-override";
import Product from "./models/product.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

mongoose.connect("mongodb://localhost:27017/exclusv", {});

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

// app.get("/women", (req, res) => {
//   res.render("women");
// });

app.all("*", (req, res) => {
  res.render("error");
});

// app.all("*", (req, res, next) => {
//   next(new ExpressError("Page Not Found", 404));
// });

// app.use((err, req, res, next) => {
//   console.log(err);
//   const { statusCode = 500 } = err;
//   res.status(statusCode).render("error");
// });

app.listen(3000, () => {
  console.log("Connection up and running");
});
