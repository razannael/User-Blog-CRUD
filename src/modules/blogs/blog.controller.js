const connection = require('../../../DB/connection.js')

const addBlog = (req, res) => {
    const { title, description, user_id } = req.body;
    connection.execute(
      `INSERT INTO blogs(title, description, user_id) VALUES('${title}', '${description}', '${user_id}');`,
      (err, result) => {
        if (err) {
          if(err.errno == 1452){
            return res.json({ message: "user not found" });
          }
          return res.json({ message: "error",err });
        }
        return res.json({ "message": "success" });
      }
    );
  }

const getBlogs =  (req, res) => {
    connection.execute(`SELECT blogs.id as blogId, users.id as userId, blogs.title, blogs.description, users.name as userName FROM users left JOIN blogs ON blogs.user_id = users.id`, (err, result) => {
      if (err) {
        return res.json({ message: "error" });
      }
      return res.json({ "message": "success", blogs: result });
    });
  }

// const updateBlog =  (req, res) => {
//     const { title, description, user_id} = req.body;
//     const { id } = req.params;
  
//     // Check if the user making the request is the same as the user who added the blog
//     connection.execute(
//       `SELECT user_id FROM blogs WHERE id = ${id}`,
//       (selectError, selectResult) => {
//         if (selectError) {
//           return res.json({ message: "error while updating blog" });
//         }
  
//         const originalUserName = selectResult[0].user_id;
  
//         if (originalUserName !== user_id) {
//           return res.json({ message: "You do not have permission to update this blog" });
//         }
  
//         // Update the blog if the user is the same
//         connection.execute(
//           `UPDATE blogs SET title = '${title}', description = '${description}', user_id = '${user_id}' WHERE id = ${id}`,
//           (updateError, updateResult) => {
//             if (updateResult.affectedRows == 0) {
//               return res.json({ message: "blog not found" });
//             }
//             return res.json({ message: "success" });
//           }
//         );
//       }
//     );
//   }
// const deleteBlog =  (req, res) => {
//     const { user_name } = req.body;
//     const { id } = req.params;
  
//     // Check if the user making the request is the same as the user who added the blog
//     connection.execute(
//       `SELECT user_name FROM blogs WHERE id = ${id}`,
//       (selectError, selectResult) => {
//         if (selectError) {
//           return res.json({ message: "error while deleting blog" });
//         }
  
//         const originalUserName = selectResult[0].user_name;
  
//         if (originalUserName !== user_name) {
//           return res.json({ message: "You do not have permission to delete this blog" });
//         }
  
//         // Delete the blog if the user is the same
//         connection.execute(
//           `DELETE FROM blogs WHERE id = ${id}`,
//           (deleteError, deleteResult) => {
//             if (deleteResult.affectedRows == 0) {
//               return res.json({ message: "blog not found" });
//             }
//             return res.json({ message: "success" });
//           }
//         );
//       }
//     );
//   }

  module.exports = {addBlog, getBlogs, updateBlog, deleteBlog};