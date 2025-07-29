const bcrypt = require('bcrypt');
const db = require('../db/connect');

// Base User class with common functionality
class User {
    constructor(data) {
        this.user_id = data.user_id;
        this.username = data.username;
        this.password_hash = data.password_hash;
        this.is_teacher = data.is_teacher;
    }

    // // Common methods all users can use
    // async verifyPassword(plainPassword) {
    //     return await bcrypt.compare(plainPassword, this.password_hash);
    // }

    // Static method to create appropriate user type

    static async createUser(data) {
         // Sign Up function that takes in data and based on the is_teacher conditon, it additionally adds the user to the Teachers table or the Students table 
        // passoword hashing is done by bcrypt
        const username = data.userName?.trim(); // Note: Using userName from data but query checks 'username'
        const password = data.password?.trim();
        const is_teacher = Boolean(data.is_teacher);
        const school_name = data.school_name?.trim();
    
        // Validate required fields
        if (!username || username.length === 0) {
            throw new Error('Username is required');
        }
    
        if (!password || password.length === 0) {
            throw new Error('Password is required');
        }
    
        // Teachers require school name
        if (is_teacher && (!school_name || school_name.length === 0)) {
            throw new Error('School name is required for teachers');
        }
    
        // Check for existing user (case-sensitive)
        const existingUser = await db.query(
            "SELECT * FROM Users WHERE username = $1", 
            [username] // Using the trimmed username
        );
        
        if (existingUser.rows.length > 0) {
            throw new Error('Username already exists');
        }
    
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        try {
            // Create user
            const result = await db.query(
                "INSERT INTO Users (username, password_hash, is_teacher) VALUES ($1, $2, $3) RETURNING *",
                [username, hashedPassword, is_teacher]
            );
            const newUser = result.rows[0];
    
            // Create student/teacher record
            if (!is_teacher) {
                const studentResult = await db.query(
                    "INSERT INTO Students (user_id) VALUES ($1) RETURNING *", 
                    [newUser.user_id]
                );
                return new Student({ 
                    ...newUser, 
                    student_id: studentResult.rows[0].student_id 
                });
            } else {
                const teacherResult = await db.query(
                    "INSERT INTO Teachers (user_id, school_name) VALUES ($1, $2) RETURNING *", 
                    [newUser.user_id, school_name] // Using trimmed school_name
                );
                return new Teacher({ 
                    ...newUser, 
                    teacher_id: teacherResult.rows[0].teacher_id,
                    school_name: teacherResult.rows[0].school_name
                });
            }
        } catch (error) {
            console.error('Sign-up Error:', error);
            throw new Error('Account creation failed. Please try again.');
        }
    }

    static async CheckUserExists(data) {
        // "isMatch" variable identifies if login was successful based on boolean output: (TRUE = successful) & (False = unsuccessful) 
        try {
            const { username, password } = data;
            // Find user by username
            const result = await db.query("SELECT * FROM Users WHERE username = $1", [username]);
            if (result.rows.length === 0) {
                // User not found
                return false;
            }
            const user = result.rows[0];
            // Compare password
            const isMatch = await bcrypt.compare(password, user.password_hash);
            return isMatch; // true if match, false otherwise
        } catch (error) {
            // Log error if needed
            return false;
        }
    }

    static async deleteUser(username) {
        // Validate input
        if (!username || typeof username !== 'string') {
            throw new Error('Valid username is required');
        }
    
        try {
            // Execute deletion query
            const result = await db.query(
                "DELETE FROM Users WHERE username = $1 RETURNING username, user_id", 
                [username]
            );
    
            // Check if user was actually deleted
            if (result.rows.length === 0) {
                console.warn(`No user found with username: ${username}`);
                return null;
            }
    
            const deletedUser = result.rows[0];
            console.log(`Successfully deleted user:`, deletedUser);
            return deletedUser.username;
    
        } catch (error) {
            console.error(`Error deleting user ${username}:`, error);
            
            // Handle specific database errors
            if (error.code === '23503') { // Foreign key violation
                throw new Error('Cannot delete user - user has associated records');
            }
            
            throw new Error(`User deletion failed: ${error.message}`);
        }
    }

    


   
}

// Student class - inherits from User
class Student extends User {
    constructor(data) {
        super(data);
        this.student_id = data.student_id;
        this.role = 'student';
    }

    static async getStats(student_id) {
        if (!student_id) {
            throw new Error('Valid Student ID is required');
        }
        
        try {
            const result = await db.query(
                "SELECT * FROM Student_Stats WHERE student_id = $1", 
                [student_id]
            );

            if (result.rows.length > 0) {
                return result.rows;
            } else {
                return "No Results"; // Return empty array if no stats found
            }
        } catch (error) {
            throw new Error('Failed to find user stats: ' + error.message);
        }
    }

    async getClasses() {
        try {
            const result = await db.query(`
                SELECT c.*, s.subject, t.school_name, u.username as teacher_name
                FROM Classes c
                JOIN Students_To_Classes stc ON c.class_id = stc.class_id
                JOIN Subjects s ON c.subject_id = s.subject_id
                JOIN Teachers t ON c.teacher_id = t.teacher_id
                JOIN Users u ON t.user_id = u.user_id
                WHERE stc.student_id = $1
            `, [this.student_id]);

            return result.rows;
        } catch (error) {
            throw new Error('Failed to get student classes: ' + error.message);
        }
    }

   
}

// Teacher class - inherits from User
class Teacher extends User {
    constructor(data) {
        super(data);
        this.teacher_id = data.teacher_id;
        this.school_name = data.school_name;
        this.role = 'teacher';
    }

   
}

module.exports = { User, Student, Teacher };