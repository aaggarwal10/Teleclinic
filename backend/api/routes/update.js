const express = require('express');

const checkAuth = require('./middleware/check-auth');

const updateRouter = express.Router();

updateRouter.post('/', checkAuth, async (req,res,next)=>{
    const {email, first_name, last_name, phone_number,health_card_number} = req.body;

    const token = await register(email, first_name, last_name, phone_number, health_card_number);
    
    res.send({accessToken: token});
});




module.exports = updateRouter;