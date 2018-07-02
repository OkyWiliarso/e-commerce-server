const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

let UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name cannot be empty']
  },
  email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: [true, 'Email address already used'],
      validate: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
      required: [true, 'email cannot be empty']
  },
  password: {
      type: String,
      required: 'Email address is required',
      required: [true, 'Password cannot be empty']
  },
  role: {
    type: String,
    required: [true]
  }
},{
  timestamps: true
})

//hooks
UserSchema.pre('save', function(next) {
  let self = this
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(self.password, salt, function(err, hash) {
      self.password = hash
      next()
    })
  })
})

module.exports = mongoose.model('user', UserSchema)