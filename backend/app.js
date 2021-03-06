
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // Logging

const app = express();

//Routes
const authRoutes = require('./api/routes/auth');
const zoomRoutes = require('./api/routes/zoom');
const appointmentsRoutes = require('./api/routes/appointments');
const queueRoutes = require('./api/routes/queue');
const infoRoutes = require('./api/routes/info');

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(cors());


//Initialize routes
app.use('/auth',authRoutes);
app.use('/zoom',zoomRoutes);
app.use('/appointments',appointmentsRoutes);
app.use('/info',infoRoutes);
app.use('/queue',queueRoutes);


//Errors
app.use((req,res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error,req,res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
})


module.exports = app;
