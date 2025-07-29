const bcrypt = require('bcrypt');
const db = require('../db/connect');

class User {
    constructor(data) {
        this.user_id = data.user_id;
        this.username = data.username;
        this.password_hash = data.password_hash;
        this.is_teacher = data.is_teacher;
    }

    static async getUserStats(student_id) {
        if (!student_id) {
            throw new Error('Valid Student ID is required');
        }
        try {
            const result = await db.query("SELECT * FROM Student_Stats WHERE student_id = $1", [student_id]);

            // Return all rows (all games the student has played)
            if (result.rows.length > 0) {
                return result.rows; // Return ALL rows
            } else {
                throw new Error(`${student_id}`);
            }
        } catch (error) {
            throw new Error('Failed to find user stats for user: ' + error.message);
        }
    }

    // Instance method to verify password
    async verifyPassword(plainPassword) {
        return await bcrypt.compare(plainPassword, this.password_hash);
    }

    // Validate user input
    static validateUserData(data) {
        const { username, password, is_teacher } = data;

        if (!username || !password) {
            throw new Error('Username and password are required');
        }

        if (username && (username.length < 3 || username.length > 50)) {
            throw new Error('Username must be between 3 and 50 characters');
        }

        if (password && password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }

        // Check for valid username characters (alphanumeric and underscore)
        if (username && !/^[a-zA-Z0-9_]+$/.test(username)) {
            throw new Error('Username can only contain letters, numbers, and underscores');
        }

        // Validate is_teacher is boolean if provided
        if (is_teacher !== undefined && typeof is_teacher !== 'boolean') {
            throw new Error('is_teacher must be true or false');
        }
    }

    static async createUser(data) {
        // Validate input
        this.validateUserData(data);

        const { username, password, is_teacher = false } = data;

        // Check if username already exists
        const existingUser = await this.findByUsername(username);
        if (existingUser) {
            throw new Error('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const result = await db.query(
                "INSERT INTO Users (username, password_hash, is_teacher) VALUES ($1, $2, $3) RETURNING *",
                [username, hashedPassword, is_teacher]
            );
            return new User(result.rows[0]);
        } catch (error) {
            throw new Error('Failed to create user: ' + error.message);
        }
    }

    static async findByUsername(username) {
        if (!username) {
            throw new Error('Username is required');
        }

        try {
            const result = await db.query("SELECT * FROM Users WHERE username = $1", [username]);
            return result.rows.length > 0 ? new User(result.rows[0]) : null;
        } catch (error) {
            throw new Error('Failed to find user: ' + error.message);
        }
    }

    static async findById(user_id) {
        if (!user_id) {
            throw new Error('User ID is required');
        }

        try {
            const result = await db.query("SELECT * FROM Users WHERE user_id = $1", [user_id]);
            return result.rows.length > 0 ? new User(result.rows[0]) : null;
        } catch (error) {
            throw new Error('Failed to find user: ' + error.message);
        }
    }

    static async delete(user_id) {
        if (!user_id) {
            throw new Error('User ID is required');
        }

        try {
            const result = await db.query("DELETE FROM Users WHERE user_id = $1 RETURNING *", [user_id]);
            return result.rows.length > 0 ? new User(result.rows[0]) : null;
        } catch (error) {
            throw new Error('Failed to delete user: ' + error.message);
        }
    }

    // Get all users (for admin purposes)
    static async findAll() {
        try {
            const result = await db.query("SELECT * FROM Users ORDER BY user_id");
            return result.rows.map(row => new User(row));
        } catch (error) {
            throw new Error('Failed to fetch users: ' + error.message);
        }
    }

    // Find all teachers
    static async findAllTeachers() {
        try {
            const result = await db.query("SELECT * FROM Users WHERE is_teacher = true ORDER BY username");
            return result.rows.map(row => new User(row));
        } catch (error) {
            throw new Error('Failed to fetch teachers: ' + error.message);
        }
    }

    // Find all students
    static async findAllStudents() {
        try {
            const result = await db.query("SELECT * FROM Users WHERE is_teacher = false ORDER BY username");
            return result.rows.map(row => new User(row));
        } catch (error) {
            throw new Error('Failed to fetch students: ' + error.message);
        }
    }

    static async findAllUsers() {
        try {
            const result = await db.query("SELECT * FROM Users ORDER BY username");
            return result.rows.map(row => new User(row));
        } catch (error) {
            throw new Error('Failed to fetch users: ' + error.message);
        }
    }

}

module.exports = User;



// user model
// class model
// game model