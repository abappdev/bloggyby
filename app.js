//jshint esversion:6

const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const _ = require('lodash')

const mongoose = require('mongoose')
mongoose.connect(
  'mongodb+srv://BloggibyUser:BloggibyPassword%232022@cluster0.mqu2tx8.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
  },
)

const homeStartingContent = 'The Blogs Website By Abhishek Bhalerao'
const aboutContent = 'About Me'
const contactContent = 'Contact Now, I will be happy to help you'

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

const postSchema = {
  title: String,
  content: String,
}
const Post = mongoose.model('Post', postSchema)

app.get('/', function (req, res) {
  Post.find({}, function (err, posts) {
    res.render('home', {
      startingContent: homeStartingContent,
      posts: posts,
    })
  })
})

app.get('/about', function (req, res) {
  res.render('about', { aboutContent: aboutContent })
})

app.get('/contact', function (req, res) {
  res.render('contact', { contactContent: contactContent })
})

app.get('/compose', function (req, res) {
  res.render('compose')
})

app.post('/compose', function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  })

  post.save(function (err) {
    if (!err) {
      res.redirect('/')
    }
  })
})

app.get('/posts/:postId', function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName)
  const requestedPostId = req.params.postId

  Post.findOne({ _id: requestedPostId }, function (err, post) {
    res.render('post', {
      title: post.title,
      content: post.content,
    })
  })
})
const PORT = 8765;
app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`)
})
