require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const secret = process.env.key

module.exports = {
  register: (req, res) => { 
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: 'user'
    })
    user.save()
    .then(response => {
      res.status(200).json({
        message: "user successfully created",
        response
      })
    })
    .catch(err => {
      res.status(400).json({
        message: "user creation failed, please try again",
        err
      })
    })
  },
  login: (req, res) => {
    User.findOne({
      email: req.body.email
    })
    .then(response => {
      if(bcrypt.compareSync(req.body.password, response.password)) {
        let token = jwt.sign({id: response._id, email: response.email, role: response.role}, `${secret}`)
        res.status(200).json({
          message: 'Login Success',
          token: token,
          id: response._id,
          role: response.role
        })
      } else {
        res.status(404).json({
          message: 'Wrong Password'
        })
      }
    })
    .catch(err => {
      res.status(404).json({
        message: 'Account did not exist'
      })
    })
  }
}