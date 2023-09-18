const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");

const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const AppError = require("./utils/appError");
const errorHandler = require("./handlers/handleError");

// Routers
const productRouter = require('./routes/products/productRoutes');
const seasonRouter = require('./routes/products/seasonRoutes');
const typeRouter = require('./routes/products/typeRoutes');
const categoryRouter = require('./routes/products/categoryRoutes')
const userRouter = require('./routes/users/userRoutes');
const reviewRouter = require('./routes/users/reviewRoutes');
const orderRouter = require('./routes/orders/orderRoute');
const webRouter = require('./routes/webRoutes');

const { ENV, API_URL } = require('./utils/constants');
// Configuring ENV
dotenv.config();

// Express App
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Set Security HTTP Headers
app.use(helmet());

// Limit Requests From Same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from the same IP. Please try again in an hour!",
});
app.use("/api", limiter);

// Body Parser, Reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data Samitaization against XSS
app.use(xss());

// Prevent Parameter Pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Logging in Development
if (ENV === "development") app.use(morgan("dev"));

//Routes
app.use('/', webRouter)
app.use(API_URL + 'products', productRouter);
app.use(API_URL + 'season', seasonRouter);
app.use(API_URL + 'type', typeRouter);
app.use(API_URL + 'category', categoryRouter);
app.use(API_URL + 'users', userRouter);
app.use(API_URL + 'reviews', reviewRouter);
app.use(API_URL + 'orders', orderRouter);

// Handle Undefined Route
app.all("*", (req, res, next) => {
  next(new AppError(`${req.originalUrl} not found`, 404));
});

app.use(errorHandler);

//Database Connection
if (!process.env.PASSWORD) console.log('Please provide a password in env');

const DB = process.env.DATABASE.replace('<password>',process.env.PASSWORD);
mongoose.connect(DB, {
  useNewUrlParser:true
})
.then( con => console.log("Database connection was successful"))
.catch(() => console.log("Database connection was unsuccessful"))

// Starting Server
const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`App is running on port ${port}`));

module.exports = app;
