const KEY = require('../../../config').KEY;

const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try{
        const token = req.header("x-access-token");
        const decoded = jwt.verify(token, KEY)
        req.userData = decoded.email;
    }
    catch(error){
        return res.status(401).json({
            message: 'Auth failed'
        });
    }

    next();
};