const express = require('express');
const user = require('./src/modules/users/user.js');
const blog = require('./src/modules/blogs/blog.js');

const app = express();
app.use(express.json());


app.use(user);
app.use(blog);

app.listen(3000||4000, ()=>{
 console.log('server is runing on port 3000...');
})