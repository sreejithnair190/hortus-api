const express = require('express');
const morgan = require('morgan');

const plantRouter = require('./routes/plantRoutes')

const app = express();


app.use(express.json());

// if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
// }

app.use((req, res, next) => {
    req.requestedTime = new Date().toISOString();
    console.log(req.requestedTime);
    next();
});

//Routes
app.use('/api/v1/plants', plantRouter)


module.exports = app

