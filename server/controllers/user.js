const { User, Student, Teacher } = require('../models/user');

async function getUserStats(req, res) {
    try {
        
        const stats = await Student.getUserStats(req.params.id);
        res.status(200).json(stats); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function getUserInfo(req,res){
    try {
        const userInfo = await User.getUserInfo(req.params.id)
        res.status(200).json(userInfo);
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
        const teacherId = req.params.teacherid; // From URL
        const { username } = req.params;
        
        const deletedUser = await User.deleteUser({ username, teacherId });
        
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.status(200).json({ 
            message: 'User deleted successfully',
            deletedUsername: deletedUser.username,
            deletedAt: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteClass(req, res) {
    try {
        const teacherId = req.params.teacherid; // From URL
        const classId = req.params.class; // From URL

        const result = await Class.deleteClass(teacherId, classId);

        if (!result.success) {
            const statusCode = result.message.includes("Unauthorized") ? 403 : 
                             result.message.includes("not found") ? 404 : 400;
            return res.status(statusCode).json(result);
        }

        res.status(200).json({
            success: true,
            data: result.deletedClass,
            message: "Class deleted successfully"
        });

    } catch (error) {
        console.error("Delete class error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

async function getStudentsInClass(req, res) {
    try {
        const classId = req.params.id;
      
      const result = await User.getStudentsInClass(classId || null);
  
      if (Object.keys(result).length === 0) {
        return res.status(404).json({ message: 'No students found' });
      }
  
      res.status(200).json(result);
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  
  async function getClassByTeacher(req, res) {
    try {
      const teacherId = req.params.teacherid;
  
      if (!teacherId) {
        return res.status(400).json({ message: 'Teacher ID is required' });
      }
  
      const classes = await Teacher.getClassByTeacher(teacherId);
  
      if (!classes || classes === "No Results") {
        return res.status(404).json({ message: 'No classes found for this teacher' });
      }
  
      res.status(200).json({ classes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async function getClasses(req, res) {
    try {
    const teacherId = req.params.teacherid; // From URL
      const classID = req.params.id;
  
      if (!classID) {
        return res.status(400).json({ message: 'Class ID is required' });
      }
  
      const classes = await Teacher.getClasses(classID, teacherId);
  
      if (!classes || classes === "No Results") {
        return res.status(404).json({ message: 'No classes found ' });
      }
  
      res.status(200).json({ classes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async function getAllClasses(req,res){
    try {
        const teacherId = req.params.teacherid; // From URL
        const classes = await Teacher.getAllClasses(teacherId);
        res.status(200).json(classes)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


// TEACHER FUNCTIONS

async function createClass(req, res) {
    try {
        const teacherId = req.params.teacherid;
        const { className } = req.body;
        const { subjectChoice } = req.body;
        
        const newClass = await Teacher.createClass(teacherId, className, subjectChoice);
        res.status(201).json(newClass);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateClassDetails(req, res) {
    try {
        const teacherId = req.params.teacherid;
        const classId = req.params.classId;
        const { className } = req.body;

        const updatedClass = await Class.updateClass(teacherId, classId, className);
        res.status(200).json(updatedClass);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}




module.exports = { 
    getUserStats, 
    createUser, 
    CheckUserExists, 
    deleteUser, 
    getUserInfo, 
    getStudentsInClass,
    getClassByTeacher,
    getClasses,
    getAllClasses,
    deleteClass,
    createClass,
    updateClassDetails

};