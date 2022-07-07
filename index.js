const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')

const Product = require('./models/product')

mongoose
  .connect('mongodb://localhost:27017/farmStand')
  .then((result) => {
    console.log('mongo connection open!')
  })
  .catch((error) => {
    console.log('Oh no mongo connection error!!!')
    console.log(error)
  })

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.get('/products', async (req, res) => {
  const products = await Product.find({})
  res.render('products/index', { products })
})

app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body)
  await newProduct.save()
  console.log(newProduct)
  res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/new', (req, res) => {
  res.render('products/new')
})

app.get('/products/:id', async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.render('products/show', { product })
})

app.listen(3000, () => {
  console.log('App is listening on port 3000!!!!')
})
