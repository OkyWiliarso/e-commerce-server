require('dotenv').config()
const jwt = require('jsonwebtoken')
const secret = process.env.key

module.exports = {
  loginCheck: (req, res, next) => {
    jwt.verify(req.headers.token, `${secret}`, function(err, decoded) {
      if(decoded){
        req.decoded = decoded
        next()
      } else {
        res.status(403).json({
          message: "invalid token"
        })
      }
    })
  },
  authorization: (req, res, next) => {
    if (req.decoded.role === 'admin') {
      next()
    } else {
      res.status(403).json({
        message: "forbidden access!"
      })
    }
  }
}