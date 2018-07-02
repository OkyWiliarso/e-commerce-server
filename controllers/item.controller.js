const Item = require('../models/item.model')

module.exports = {
  getAllItems: function(req, res){
    Item.find()
    .then(response => {
      res.status(200).json({
        message: "success get all data",
        response
      })
    })
    .catch(err => {
      res.status(404).json({
        message: "data not found",
        err
      })
    })
  },
  addItem: function(req, res) {
    let item = new Item({
      name: req.body.name,
      image: req.file.cloudStoragePublicUrl,
      price: req.body.price,
      stock: req.body.stock
    })
    item.save()
    .then(response => {
      res.status(200).json({
        message: "data successfully created",
        data: response,
        link: req.file.cloudStoragePublicUrl
      })
    })
    .catch(err => {
      res.status(400).json({
        message: "create data failed",
        err
      })
    })
  },
  updateItem: function(req, res) {
    Item.findOneAndUpdate({
      _id: req.params.id
    },{
      name: req.body.name,
      image: req.body.image,
      stock: req.body.stock,
      price: req.body.price
    }, (err, newItem) => {
      if(err) throw err

      res.status(200).json({
        message: "data have been updated",
        data: newItem
      })
    })
  },
  deleteItem: function(req, res) {
    Item.deleteOne({
      _id: req.params.id
    })
    .then(response => {
      res.status(200).json({
        message: "success deleting data"
      })
    })
    .catch(err => {
      res.status(400).json({
        message: "failed deleting record"
      })
    })
  }
}