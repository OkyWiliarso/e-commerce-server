const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  name: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: String
  },
  stock: {
    type: Number
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('item', ItemSchema)