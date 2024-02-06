const express = require('express');
const app = express();

const {addBlog} = require('./blog.controller.js')
const {getBlogs} = require('./blog.controller.js')
const {updateBlog} = require('./blog.controller.js')
const {deleteBlog} = require('./blog.controller.js')

// CRUD operations for blogs
app.post('/blog/add', addBlog);
  
  app.get('/blogs', getBlogs);
  
  app.patch('/blog/:id', updateBlog);
  
  app.delete('/blog/:id', deleteBlog);

  module.exports= app;