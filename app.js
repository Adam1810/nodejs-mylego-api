const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const setRouter = require('./routes/setsRoutes');
const swaggerDefinition = require('./utils/swaggerDefinition');

const app = express();
// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());
// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

//CORS
app.use(cors());
app.options('*', cors());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['price'],
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

//Swagger

// const swaggerDefinition = {
//   openapi: '3.0.0',
//   info: {
//     title: 'Express API for JSONPlaceholder',
//     version: '1.0.0',
//   },
// };

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// 3) ROUTES
app.use('/api/v1/sets', setRouter);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
