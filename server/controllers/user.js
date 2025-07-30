const { User, Student, Teacher } = require('../models/User.js');

async function getStats(req, res) {
    try {
        
        const stats = await Student.getStats(req.params.id);
        res.status(200).json(stats); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function createUser(req, res) {
    try {
        const { username, password, is_teacher, school_name } = req.body;
        const user = await User.createUser({ username, password, is_teacher, school_name });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function CheckUserExists(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.CheckUserExists({ username, password });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deleteUser(req, res) {
    try {
        const { username } = req.body;
        const user = await User.deleteUser({ username });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}




module.exports = { getStats, createUser, CheckUserExists, deleteUser};