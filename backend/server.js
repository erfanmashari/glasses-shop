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
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     saveUninitialized: true,
//     cookie: { secure: false, maxAge: oneDay, sameSite: true },
//     resave: false,
//     store: new RedisStore({ client: redisClient }),
//   })
// );
// app.use(
//   session({
//     // secret: process.env.SESSION_SECRET,
//     // resave: false,
//     // saveUninitialized: true,
//     // cookie: { secure: false, maxAge: 20 * 60 * 1000 },
//     name: "sessionID",
//     cookie: {
//       maxAge: 20 * 60 * 1000,
//       sameSite: "none", // in order to response to both first-party and cross-site requests
//       secure: "auto", // it should set automatically to secure if is https.
//       httpOnly: true,
//     },
//     resave: false,
//     secret: process.env.SESSION_SECRET,
//     saveUninitialized: false,
//     // store: redisStore,
//   })
// );
// app.use(express.json());
// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: true }));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "localhost"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// for parsing application/json
// app.use(bodyParser.json());

// // for parsing application/xwww-
// app.use(bodyParser.urlencoded({ extended: true }));
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
