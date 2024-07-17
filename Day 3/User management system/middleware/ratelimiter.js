const rateLimit =require('express-ratelimit');
require('dotenv').config();



const apilimiter =rateLimit({
    windowMs:3*1000*60,
    max:1,
    messege:'Too many requests,please try again after 3 minites'
})


module.exports ={
    apilimiter
}