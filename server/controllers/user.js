const User = require('../models/user');


async function getUserStats(req,res) {
    try {
        const user = await User.getUserStats(req.params.id);
        res.status(201).json(user);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    
}

// async function createUser(req,res){
//     try {
//         const {username,password, } = req.body;
//         const user = await User.create({ username, password });
//         res.status(201).json(user);
//       } catch (error) {
//         res.status(400).json({ error: error.message });
//       }
// }

// async function getUser(req, res) {
//   try {
//     const user = await User.findById(req.params.id);
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// }

// async function getUserByUsername(req, res) {
//   try {
//     const user = await User.findByUsername(req.params.username);
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// }

// async function getUserById(req, res) {
//   try {
//     const user = await User.findById(req.params.id);
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// }


// user: 
// get username
// get ID - teaacher and student 
// get all users
// create 




module.exports = {  getUserStats };