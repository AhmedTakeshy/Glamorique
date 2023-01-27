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
app.use(express.json());
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

// app.use((res, req, next) => {
//   let cart = req.session.cartItems;
//   if (!cart) {
//     cart = {
//       items: {},
//       totalAmount: 0,
//     };
//     req.session.cartItems = cart;
//   }
//   res.locals.cartItems = cart;
//   next();
// });

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

app.post("/add-to-cart", async (req, res) => {
  const { productId } = req.body;
  const foundProduct = await Product.findById(productId);
  let cart = req.session.cart;
  if (!cart) {
    cart = {
      items: [],
      totalAmount: 0,
    };
  }
  let existingProduct = cart.items.find((item) => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity++;
    cart.totalAmount += foundProduct.price;
  } else {
    cart.items.push({
      id: foundProduct.id,
      name: foundProduct.brandName,
      price: foundProduct.price,
      quantity: 1,
    });
    cart.totalAmount += foundProduct.price;
  }
  req.session.cart = cart;
  // res.status(204).send(cart); //it will prevent the page from reloading
  res.end();
});

app.get("/add-to-cart", async (req, res) => {
  const cart = req.session.cart;
  res.json(cart);
});

app.all("*", (req, res) => {
  res.render("error");
});

app.listen(3000, () => {
  console.log("Connection up and running");
});
