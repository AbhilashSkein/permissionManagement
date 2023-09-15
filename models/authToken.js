const authToken = require('jsonwebtoken');

const verifyToken = (req,res,next) =>{
    const bearerHeader = req.headers['authorization'];
    if(bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    }else{
      res.send({
            result:'not valid'
      });
    }
  }

module.exports = {verifyToken};