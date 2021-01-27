const express = require('express');
const morgan = require('morgan');
const app = express();
const tourRoutes = require('./routes/tourRoutes');
const userRoutes = require('./routes/userRoutes');
const globalErrorsHandler = require('./controllers/errorControllers');
const AppError = require('./utils/AppErrors');

app.use(express.json());

console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/users', userRoutes);

app.all('*', (req, res, next) => {
    next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
})

app.use(globalErrorsHandler)

module.exports = app;