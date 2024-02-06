const express = require('express');
const app = express();
const {addUser} = require('./user.controller.js')
const {getUsers} = require('./user.controller.js')
const {updateUser} = require('./user.controller.js')
const {deleteUser} = require('./user.controller.js')
app.post('/user/add',addUser )

app.get('/users',getUsers )

app.patch('/user/:id', updateUser);

app.delete('/user/:id', deleteUser);

module.exports= app;