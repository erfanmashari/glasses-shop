const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const session = require("express-session");
const cors = require('cors');
const path = require("path")
const dotenv = require('dotenv');
// const userRoutes = require("./routes/user.routes");
// const authRoutes = require("./routes/auth.routes");
// const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");

// express app
const app = express();

// config env file
dotenv.config();

// cors policy
app.use(cors());

// connect to mongodb
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URI)
  .then((result) => {
    // listen for requests
    app.listen(8000);

    console.log("[Server Started]");
  })
  .catch((err) => {
    console.log(err);
    console.log("[Server Not Started - Mongoose Error]");
  });

// middleware & static files
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 20 * 60 * 1000 },
  })
);
// app.use(express.json());
// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: true }));

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(express.static('public'));

// routing
// app.use("/users", userRoutes);
// app.use("/auth", authRoutes);
// app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
