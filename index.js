import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";
import Product from "./models/product.js";
import mongoose from "mongoose";
import methodOverride from "method-override";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const dbUrl = process.env.MDB;
const secret = process.env.SECRET;

const store = MongoStore.create({
  mongoUrl: dbUrl,
  secret,
  touchAfter: 24 * 3600,
});

const sessionConfig = {
  store,
  name: "exclusv",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    // secure: true
    expires: Date.now() + 1000 * 60 * 60,
    maxAge: 1000 * 60 * 60,
  },
};

app.use(session(sessionConfig));

mongoose.connect(dbUrl, {});

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

app.get("/women", async (req, res) => {
  const products = await Product.find({});
  res.render("women", { products });
});

app.post("/women", async (req, res) => {
  const filterResult = req.body;
  const products = await Product.find({
    type: filterResult.type,
    brand: { $in: [`${filterResult.brand}`] },
    price: {
      $gte: +filterResult.lower,
      $lte: +filterResult.max,
    },
  });
  res.render("women", { products });
});

app.get("/women/:id", async (req, res) => {
  const { id } = req.params;
  const foundProduct = await Product.findById(id);
  if (foundProduct) {
    res.render("product", { foundProduct });
  } else {
    res.render("error");
  }
});

app.post("/cart", async (req, res) => {
  const { productId } = req.body;
  const product = await Product.findById(productId);
  let cart = req.session.cart;
  if (!cart) {
    cart = {
      items: {},
      totalAmount: 0,
    };
  }
  if (cart.items[productId]) {
    cart.items[productId]++;
    cart.totalAmount += product.price;
  } else {
    cart.items[productId] = 1;
    cart.totalAmount += product.price;
  }
  console.log(cart);
  req.session.cart = cart;
  // res.status(204).send();
  res.redirect("./women");
});

// app.get("/cart", (req, res) => {
//   const add
//  })

app.all("*", (req, res) => {
  res.render("error");
});

app.listen(3000, () => {
  console.log("Connection up and running");
});
