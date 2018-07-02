require('dotenv').config()
const { dbuser, dbpassword } = process.env
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const usersRouter = require('./routes/users')
const itemsRouter = require('./routes/items')

const app = express()
app.use(cors())

//databse connection
const mongoose = require('mongoose')
const dbUrl = `mongodb://${dbuser}:${dbpassword}@ds233500.mlab.com:33500/e-commerce`
mongoose.connect(dbUrl, (err) => {
  if(!err) {
    console.log('success connected to database');
  } else {
    console.log('error connect to database');
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/users', usersRouter)
app.use('/items', itemsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
