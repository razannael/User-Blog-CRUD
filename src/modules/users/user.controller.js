const connection = require('../../../DB/connection.js')

const addUser = (req,res)=>{
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
}

const getUsers = (req,res)=>{
    connection.execute(`SELECT * FROM users`,(err, result)=>{
      if(err){
        return res.json({message:"error"});
      }
      return res.json({"message" : "success", users : result});
    } );
  }

const updateUser = (req,res)=>{
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
  }

const deleteUser = (req,res)=>{
    const {id} = req.params;
    connection.execute(`DELETE FROM users WHERE id = ${id}`,
    (error, result)=>{
      if(result.affectedRows ==0){
        return res.json({message: "user not found"});
      }
      return res.json({message:"success"});
    });
  }

module.exports = {addUser, getUsers, updateUser, deleteUser}