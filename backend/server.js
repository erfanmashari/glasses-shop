const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const { createClient } = require("redis");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const productRoutes = require("./routes/product.routes");
const brandRoutes = require("./routes/brand.routes");
const sellerRoutes = require("./routes/seller.routes");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const addressRoutes = require("./routes/address.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const favoriteRoutes = require("./routes/favorite.routes");
const commentRoutes = require("./routes/comment.routes");
const notificationRoutes = require("./routes/notification.routes");
const passwordRoutes = require("./routes/password.routes");
const transactionRoutes = require("./routes/transaction.routes");

// express app
const app = express();

// config env file
dotenv.config();

// cors policy
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

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
let redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: process.env.protocol === 'https',
      maxAge: (60 * 60 * 1000)
    }
  })
);
//form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cookie parser middleware
app.use(cookieParser(process.env.SESSION_SECRET));

// for parsing multipart/form-data
app.use(express.static("public"));

// routing
app.use("/products", productRoutes);
app.use("/brands", brandRoutes);
app.use("/sellers", sellerRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/addresses", addressRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/comments", commentRoutes);
app.use("/notifications", notificationRoutes);
app.use("/password", passwordRoutes);
app.use("/transactions", transactionRoutes);
