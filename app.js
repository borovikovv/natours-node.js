const express = require('express');
const morgan = require('morgan');
const app = express();
const tourRoutes = require('./routes/tourRoutes');

app.use(express.json());

console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/tours', tourRoutes);

module.exports = app;