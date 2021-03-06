
const KEY = require('../config').KEY;
const client = require('./database').client;



const jwt = require('jsonwebtoken');

const register = (email, first_name,last_name, password, phone_number, health_card_number) => client.query(
    'INSERT INTO users(email, first_name, last_name, password, phone_number, health_card_number) VALUES ($1,$2,$3,$4,$5, $6) RETURNING email',
    [email,first_name,last_name,password,phone_number,health_card_number]
)
    .then(res => generateToken(res.rows[0].email))
    .catch(e => e);

const login = (email,password) => client.query(
    'SELECT * FROM users where email = $1 AND password = $2',
    [email,password]
)
    .then(res => generateToken(res.rows[0].email))
    .catch(e => e);

const generateToken = (email) => jwt.sign(
    { email: email},
    KEY,
    {expiresIn: "24h"}
);
//get the zoom auth by email and return it
const retrieve_zoom_auth=(email)=>client.query(
    'SELECT zoomauth FROM doctors WHERE email = $1',[email]

)
    .then(res => res.rows[0].zoomauth)//might be zoom_auth
    .catch(e => e);

module.exports = {
    register: register,
    login: login,
    retrieve_zoom_auth:retrieve_zoom_auth
}
