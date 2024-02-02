const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());
const connection = mysql.createConnection({
  host : 'localhost',
  user: 'root',
  password: '',
  database: 'knowledge_node'
});

app.post('/user/add', (req,res)=>{
    const {name, email, bio}= req.body;
    connection.execute(`INSERT INTO users(name, email, bio) VALUES('${name}', '${email}', '${bio}');`);
    (err,result)=>{
      if(err){
        if(err.errno==1062)
        return res.json({message : "email already exists"});
      else
      return res.json({message: "error while creating user"})
      }
    }
    return res.json({"message" : "success"});
})

app.get('/users', (req,res)=>{
  connection.execute(`SELECT * FROM users`,(err, result)=>{
    if(err){
      return res.json({message:"error"});
    }
    return res.json({"message" : "success", users : result});
  } );
})

app.patch('/user/:id',(req,res)=>{
  const {email} = req.body;
  const {id} = req.params;
  connection.execute(`UPDATE users SET email = '${email}' WHERE id =${id}`,
  (error,result)=>{
    if(result.affectedRows==0){
      return res.json({message:"user not found"});
    }
    return res.json({message : "success"});
  }
  );
});

app.delete('/user/:id',(req,res)=>{
  const {id} = req.params;
  connection.execute(`DELETE FROM users WHERE id = ${id}`,
  (error, result)=>{
    if(result.affectedRows ==0){
      return res.json({message: "user not found"});
    }
    return res.json({message:"success"});
  });
});

// CRUD operations for blogs
app.post('/blog/add', (req, res) => {
  const { title, description, user_name } = req.body;
  connection.execute(
    `INSERT INTO blogs(title, description, user_name) VALUES('${title}', '${description}', '${user_name}');`,
    (err, result) => {
      if (err) {
        return res.json({ message: "error while creating blog" });
      }
      return res.json({ "message": "success" });
    }
  );
});

app.get('/blogs', (req, res) => {
  connection.execute(`SELECT * FROM blogs`, (err, result) => {
    if (err) {
      return res.json({ message: "error" });
    }
    return res.json({ "message": "success", blogs: result });
  });
});

app.patch('/blog/:id', (req, res) => {
  const { title, description, user_name } = req.body;
  const { id } = req.params;

  // Check if the user making the request is the same as the user who added the blog
  connection.execute(
    `SELECT user_name FROM blogs WHERE id = ${id}`,
    (selectError, selectResult) => {
      if (selectError) {
        return res.json({ message: "error while updating blog" });
      }

      const originalUserName = selectResult[0].user_name;

      if (originalUserName !== user_name) {
        return res.json({ message: "You do not have permission to update this blog" });
      }

      // Update the blog if the user is the same
      connection.execute(
        `UPDATE blogs SET title = '${title}', description = '${description}', user_name = '${user_name}' WHERE id = ${id}`,
        (updateError, updateResult) => {
          if (updateResult.affectedRows == 0) {
            return res.json({ message: "blog not found" });
          }
          return res.json({ message: "success" });
        }
      );
    }
  );
});

app.delete('/blog/:id', (req, res) => {
  const { user_name } = req.body;
  const { id } = req.params;

  // Check if the user making the request is the same as the user who added the blog
  connection.execute(
    `SELECT user_name FROM blogs WHERE id = ${id}`,
    (selectError, selectResult) => {
      if (selectError) {
        return res.json({ message: "error while deleting blog" });
      }

      const originalUserName = selectResult[0].user_name;

      if (originalUserName !== user_name) {
        return res.json({ message: "You do not have permission to delete this blog" });
      }

      // Delete the blog if the user is the same
      connection.execute(
        `DELETE FROM blogs WHERE id = ${id}`,
        (deleteError, deleteResult) => {
          if (deleteResult.affectedRows == 0) {
            return res.json({ message: "blog not found" });
          }
          return res.json({ message: "success" });
        }
      );
    }
  );
});
app.listen(3000, ()=>{
 console.log('server is runing on port 3000...');
})