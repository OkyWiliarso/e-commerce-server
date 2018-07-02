const express = require('express')
const router = express.Router()
const {
  getAllItems,
  addItem,
  updateItem,
  deleteItem
} = require('../controllers/item.controller')
const{
  loginCheck,
  authorization
} = require('../middlewares/auth')
const {
  multer,
  sendUploadToGCS
} = require('../helpers/images')

router
  .get('/list', getAllItems)
  .post('/add', loginCheck, authorization, multer.single('image'), sendUploadToGCS, addItem)
  .put('/update/:id', loginCheck, updateItem)
  .delete('/delete/:id', loginCheck, authorization, deleteItem)

module.exports = router