const express = require("express");
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
const plantRouter = require('./routes/products/plantRoutes');
const seedRouter = require('./routes/products/seedRoutes');
const fertilizerRouter = require('./routes/products/fertilizerRoutes');
const accessoryRouter = require('./routes/products/accessoryRoutes');
const seasonRouter = require('./routes/seasonRoutes');
const typeRouter = require('./routes/typeRoutes');
const userRouter = require('./routes/users/userRoutes');
const reviewRouter = require('./routes/users/reviewRoutes');

// Configuring ENV
dotenv.config({ path: "./config.env" });

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

// Logging in Development
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

//Routes
app.use(process.env.API + 'plants', plantRouter);
app.use(process.env.API + 'seeds', seedRouter);
app.use(process.env.API + 'fertilizers', fertilizerRouter);
app.use(process.env.API + 'accessory', accessoryRouter);
app.use(process.env.API + 'season', seasonRouter);
app.use(process.env.API + 'type', typeRouter);
app.use(process.env.API + 'user', userRouter);
app.use(process.env.API + 'reviews', reviewRouter);

// Handle Undefined Route
app.all("*", (req, res, next) => {
  next(new AppError(`${req.originalUrl} not found`, 404));
});

app.use(errorHandler);

module.exports = app;
