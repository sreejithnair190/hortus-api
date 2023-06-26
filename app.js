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
const plantRouter = require("./routes/plantRoutes");
const seedRouter = require('./routes/seedRoutes')
const userRouter = require('./routes/userRoutes')

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
app.use('/api/v1/plants', plantRouter)
app.use('/api/v1/seeds',seedRouter)
app.use('/api/v1/user',userRouter)

// Handle Undefined Route
app.all("*", (req, res, next) => {
  next(new AppError(`${req.originalUrl} not found`, 404));
});

app.use(errorHandler);

module.exports = app;
