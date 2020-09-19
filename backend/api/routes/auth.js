const express = require('express');
const register = require('../../services/auth').register;
const login = require('../../services/auth').login;
const isDoctor = require('../../services/appointments').isDoctor;


const authRouter = express.Router();

authRouter.post('/register',async (req,res,next)=>{
    const {email, first_name, last_name, password, phone_number,health_card_number} = req.body;
    console.log("this is all the info",email, first_name, last_name, password, phone_number,health_card_number);
    const token = await register(email, first_name, last_name, password, phone_number, health_card_number);

    res.send({accessToken: token});
});



authRouter.post('/login', async (req,res,next) => {

    const { email, password } = req.body;
    console.log(email,password);

    const token = await login(email,password);
    const boo = await isDoctor(email);
    console.log(boo)
    res.send({accessToken: token,isDoctor:boo});
});

module.exports = authRouter;
