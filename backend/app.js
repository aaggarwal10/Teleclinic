const express = require('express');
const cors = require('cors');

const morgan = require('morgan');

const app = express();

//Routes
const authRoutes = require('./api/routes/auth');
const zoomRoutes = require('./api/routes/zoom')
app.use(morgan('dev'));

//app.use(express.json());

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  }
app.use(cors(corsOptions));

app.use(express.json());

//Initialize Routes

app.use('/auth',authRoutes);
app.use('/zoom',zoomRoutes);



//Errors


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;
