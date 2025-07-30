# API Endpoints

## GET Student Stats
`userRouter.get('/student/:id/stats', userController.getUserStats); `
### Example Json

Requires - Requires UserID

Example HTTP Request: 
GET localhost:3007/user/student/1/stats
Body: {
}

Expected Response:
`[
{
        "student_id": 1,
        "game_id": 5,
        "times_played": 7,
        "avg_score": 92,
        "best_score": 98,
        "last_score": 95
    },

    {
        "student_id": 1,
        "game_id": 4,
        "times_played": 3,
        "avg_score": 78,
        "best_score": 88,
        "last_score": 82
    },

    {
        "student_id": 1,
        "game_id": 1,
        "times_played": 5,
        "avg_score": 85,
        "best_score": 95,
        "last_score": 90
    }
] `



`userRouter.get('/:id', userController.getUserInfo); `
### Example Json

Requires - Requires UserID

Example HTTP Request: 
GET localhost:3007/user/1
Body: {
}

Expected Response:
`[
    {
        "username": "sarah_johnson",
        "is_teacher": true
    }
]`



`userRouter.get('/:teacherid/:id/classes', userController.getClassByTeacher);` 
### Example Json

Requires - Requires TeacherID

Example HTTP Request: 
GET localhost:3007/user/2/4/classes
Body: {
}

Expected Response:
[
    {
        "class_name": "Algebra I"
    },
    {
        "class_name": "Biology Basics"
    },
    {
        "class_name": "Creative Writing"
    },
    {
        "class_name": "European History"
    },
    {
        "class_name": "Geometry"
    },
    {
        "class_name": "Physical Science"
    }
]




`userRouter.get('/students/classes/:id', userController.getStudentsInClass);`
### Example Json

Requires - classID

Example HTTP Request: 
GET ocalhost:3007/user/students/classes/4
Body: {
}

Expected Response:
{
    "class_name": "Algebra I",
    "students_names": [
        "alice_cooper"
    ]
}


`userRouter.get('/:id/classes', userController.getClasses):`  

### Example Json

Requires - TeacherID and classID

Example HTTP Request: 
GET localhost:3007/user/3/4/classes
Body: {
}

Expected Response:
{
    "classes": [
        {
            "class_name": "Algebra I"
        }
    ]
}

`userRouter.get('/:teacherid/allclasses', userController.getAllClasses);`
### Example Json

Requires - TeacherID 

Example HTTP Request: 
GET localhost:3007/user/3/classes
Body: {
}

Expected Response:
[
    {
        "class_name": "Algebra I"
    },
    {
        "class_name": "Biology Basics"
    },
    {
        "class_name": "Creative Writing"
    },
    {
        "class_name": "European History"
    },
    {
        "class_name": "Geometry"
    },
    {
        "class_name": "Physical Science"
    }
]


`userRouter.post('/signup', userController.createUser);`
### Example Json
Requires - N/A

Example HTTP Request: 
POST localhost:3007/user/signup
Body: {
    "username": "hello",
    "password": "password"
}

Expected Response:
{
    "user_id": 18,
    "username": "hello",
    "password_hash": "$2b$10$AMf4.C.r7i/42A.TrXWWB.5Ro1vBQD5hwsJtTltftWEdsgI.gnt5C",
    "is_teacher": false,
    "student_id": 13,
    "role": "student"
}

`userRouter.post('/login', userController.CheckUserExists)`
### Example Json
Requires - N/A

Example HTTP Request: 
POST localhost:3007/user/login
Body: {
    "username": "hello",
    "password": "password"
}

Expected Response (boolean):

true 

`userRouter.post('/:teacherid/classes', userController.createClass); `

### Example Json
Requires - Subject Name - suggest using a toggle list so user can choose what subject they want to choose from the list of subjects exisiting in the DB

Example HTTP Request: 
POST localhost:3007/3/classes
Body: {
    "className": "hello",
    "subjectChoice": "Art"
}

Expected Response:
{
    "class_id": 17,
    "class_name": "hello",
    "subject_id": 5
}

`userRouter.post('/:teacherid/classes', userController.createClass);`
### Example Json
Requires - Subject Name - suggest using a toggle list so user can choose what subject they want to choose from the list of subjects exisiting in the DB

Example HTTP Request: 
POST localhost:3007/3/classes
Body: {
    "className": "hello",
    "subjectChoice": "Art"
}

Expected Response:
{
    "class_id": 17,
    "class_name": "hello",
    "subject_id": 5
}

`userRouter.delete('/:username', userController.deleteUser);`
### Example Json
Requires - username

Example HTTP Request: 
DELETE localhost:3007/user/hello
Body: {
}

Expected Response:
{
    "message": "User deleted successfully",
    "deletedUsername": "hello",
    "deletedAt": "2025-07-30T15:33:36.986Z"
}

`userRouter.delete('/:teacherid/classes/:class', userController.deleteClass);`  
### Example Json
Requires - teacherID & ClassID

Example HTTP Request: 
DELETE localhost:3007/user/3/classes/5
Body: {
}

Expected Response:
{
    "success": true,
    "message": "Class deleted successfully"
}

`userRouter.patch('/:teacherid/classes/:class', userController.updateClassDetails); `
### Example Json
Requires - teacherID & ClassID

Example HTTP Request: 
PATCH localhost:3007/user/4/classes/4
Body: {
    "className": "changed"
}

Expected Response:
{
    "class_id": 4,
    "class_name": "changed"
}