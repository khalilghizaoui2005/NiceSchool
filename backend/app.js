// importation
<<<<<<< HEAD
const express = require("express"); // Import Express framework
const cors = require("cors"); // Import CORS for cross-origin requests
const bodyParser = require("body-parser"); // Import body-parser for parsing requests
const mongoose = require("mongoose"); // Import mongoose for MongoDB
const User = require("./models/user"); // Import User model
const Cours = require("./models/cours"); // Import Cours model
const Classe = require("./models/classe"); // Import Classe model
const Classecours = require("./models/classeCours"); // Import Notification model
const Evaluation = require("./models/evaluation"); // Import Evaluation model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const session = require("express-session"); // Import express-session for session management
const jwt = require("jsonwebtoken"); // Import jsonwebtoken for authentication
const multer = require('multer'); // Import multer for file uploads
const path = require('path'); // Import path for file paths




// DB connection
mongoose.connect('mongodb://localhost:27017/ecoleDB', { // Connect to MongoDB
    useNewUrlParser: true, // Use new URL parser
    useUnifiedTopology: true // Use new topology engine
})

// Create express app
const app = express(); // Initialize express app

// app configuration
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Enable JSON parsing
app.use(bodyParser.urlencoded({ extended: true })); // Enable URL-encoded parsing
const secretKey = "Croco@Tunis2025@@FSJS"; // Secret key for JWT & session
app.use(session({ secret: secretKey })); // Enable session management

// static path for student photos
app.use('/images', express.static(path.join('backend/uploads/photosStudents'))); // Serve student photos

// multer storage for student photos
const storage = multer.diskStorage({ // Configure multer storage
    destination: (req, file, cb) => { // Set upload folder
        cb(null, "backend/uploads/photosStudents"); // Destination folder
    },
    filename: (req, file, cb) => { // Set unique filename
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// static path for teacher CVs
app.use('/cvs', express.static(path.join('backend/uploads/cvsTeachers'))); // Serve teacher CVs

// multer storage for teacher CVs
const storageCv = multer.diskStorage({ // Configure multer storage for CV
    destination: (req, file, cb) => { // Set upload folder
        cb(null, "backend/uploads/cvsTeachers"); // Destination folder
    },
    filename: (req, file, cb) => { // Set unique filename
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// initialize multer
const upload = multer({ storage: storage }); // Multer instance for photos
const uploadCv = multer({ storage: storageCv }); // Multer instance for CVs

// make app exportable
module.exports = app; // Export app


// ****************************************************User*********************************************************

// Get all users
app.get("/users", (req, res) => {
    console.log("here into BL : Get ALL users") // log backend action
    User.find().then((docs) => {
        console.log("Here is DB response", docs) // log DB response
        res.json({ tab: docs }) // return all users
    })
})

// Get all teachers
app.get("/users/teacher", (req, res) => {
    console.log("here into BL : Get ALL users teacher") // log backend action
    User.find({ role: "teacher" }).then((docs) => {
        console.log("Here is DB response", docs) // log DB response
        res.json({ tab: docs }) // return teachers only
    })
})

// Get all students
app.get("/users/student", (req, res) => {
    console.log("here into BL : Get ALL students") // log backend action
    User.find({ role: "student" }).populate('classeId').then((docs) => {
        console.log("Here is DB response", docs) // log DB response
        res.json({ tab: docs }) // return students with class populated
    })
})

// Get students by class
app.get("/users/studentsClasse/:id", (req, res) => {
    console.log("here into BL : Get students by class") // log backend action
    User.find({ classeId: req.params.id }).populate('classeId').then((docs) => {
        console.log("Here is DB response", docs) // log DB response
        res.json({ tab: docs }) // return students for specific class
    })
})

// Signup user (student/parent)
app.post("/users/signup", upload.single("photo"), (req, res) => {
    console.log("here is img", req.file?.filename) // log uploaded file
    console.log("here into BL : post user") // log backend action

    User.findOne({ email: req.body.email }).then((doc) => {
        if (doc) return res.json({ msg: "email already exist" }) // check email

        bcrypt.hash(req.body.pass, 10).then((cryptpwd) => {
            const userObj = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                tel: req.body.tel,
                adr: req.body.adr,
                pass: cryptpwd, // hashed password
                photo: req.file ? req.file.filename : null,
                role: req.body.role
            })

            userObj.save((err, doc) => {
                if (err) {
                    console.log("error add user", err) // log error
                    return res.json({ msg: "Error", error: err })
                }
                res.json({ msg: "Add with success", user: doc }) // return saved user
            })
        })
    })
})

// Signup teacher
app.post("/users/signupTeacher", uploadCv.single("cv"), (req, res) => {
    console.log("here is CV", req.file?.filename) // log CV
    console.log("here into BL : post teacher") // log backend action

    User.findOne({ email: req.body.email }).then((doc) => {
        if (doc) return res.json({ msg: "email already exist" }) // check email

        bcrypt.hash(req.body.pass, 10).then((cryptpwd) => {
            const userObj = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                tel: req.body.tel,
                adr: req.body.adr,
                pass: cryptpwd,
                cv: req.file ? req.file.filename : null, // save CV
                spec: req.body.spec,
                valide: "non valide",
                role: req.body.role
            })

            userObj.save((err, doc) => {
                if (err) {
                    console.log("error add teacher", err)
                    return res.json({ msg: "Error", error: err })
                }
                res.json({ msg: "Add with success", user: doc }) // return saved teacher
            })
        })
    })
})

// Signup parent
app.post("/users/signupParent", (req, res) => {
    console.log("here into BL : post parent") // log backend action

    User.findOne({ email: req.body.email }).then((doc) => {
        if (doc) return res.json({ msg: "email already exist" }) // check email

        bcrypt.hash(req.body.password, 10).then((cryptpwd) => {
            const userObj = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                tel: req.body.tel,
                adr: req.body.address,
                pass: cryptpwd,
                role: req.body.role
            })

            userObj.save((err, doc) => {
                if (err) {
                    console.log("error add parent", err)
                    return res.json({ msg: "Error", error: err })
                }
                res.json({ msg: "Add with success", user: doc }) // return saved parent
            })
        })
    })
})
// Signup Admin
app.post("/users/signupAdmin", (req, res) => {
    console.log("here into BL : post admin") // log backend action
        bcrypt.hash(req.body.pass, 10).then((cryptpwd) => {
            const userObj = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                tel: req.body.tel,
                pass: cryptpwd,
                role: "admin"
            })

            userObj.save((err, doc) => {
                if (err) {
                    console.log("error add admin", err)
                    return res.json({ msg: "Error", error: err })
                }
                res.json({ msg: "Add with success", user: doc }) // return saved admin
            })
        })
    })


// Validate teacher
app.get("/users/valideTeacher/:id", (req, res) => {
    console.log("here into BL : validate teacher") // log backend action

    User.findById(req.params.id).then(foundTeacher => {
        if (!foundTeacher) return res.json({ msg: "Teacher not found" }) // check existence
        foundTeacher.valide = "valide" // set teacher as validated
        return foundTeacher.save()
    }).then(updatedTeacher => {
        res.json({ msg: "Modifier with success", user: updatedTeacher }) // return updated teacher
    })
})

// Check if telephone exists for student
app.get("/users/checkTel/:tel", (req, res) => {
    console.log("here into BL : check student tel") // log backend action
    User.findOne({ tel: req.params.tel, role: "student" }).then((doc) => {
        console.log("here is doc check tel", doc) // log response
        res.json({ isTel: !!doc }) // return true/false
    })
})

// Get user by ID
app.get("/users/:id", (req, res) => {
    console.log("here into BL : Get user by ID") // log backend action
    User.findById(req.params.id).then((doc) => {
        console.log("here is doc", doc) // log DB response
        res.json({ userObj: doc }) // return user
    })
})

// Get student by ID with class populated
app.get("/users/student/:id", (req, res) => {
    console.log("here into BL : Get student by ID") // log backend action
    User.findById(req.params.id).populate('classeId').then((doc) => {
        console.log("here is doc", doc) // log DB response
        res.json({ userObj: doc }) // return student
    })
})

// Get student evaluations by telephone
app.get("/users/studentEval/:tel", (req, res) => {
    console.log("here into BL : Get student eval by tel") // log backend action
    User.findOne({ tel: req.params.tel, role: "student" })
        .populate({
            path: "evalIds",
            populate: [
                { path: "coursId", select: "name" },
                { path: "teacherId", select: "firstName lastName" }
            ]
        })
        .then((student) => {
            if (!student) return res.status(404).json({ msg: "Student not found" }) // check existence

            const result = student.evalIds.map((e) => ({
                firstName: student.firstName,
                lastName: student.lastName,
                coursName: e.coursId?.name,
                note: e.note,
                eval: e.eval
            }))

            res.json({ evaluations: result }) // return evaluations
        })
        .catch((err) => res.status(500).json(err)) // handle error
})

// Delete user and related data
app.delete("/users/deleteUser/:id", async (req, res) => {
    try {
        const userId = req.params.id // get ID

        const deleteRes = await User.deleteOne({ _id: userId }) // delete user
        if (deleteRes.deletedCount !== 1) return res.json({ msg: false, error: "User not found" })

        await Classe.updateMany({ students: userId }, { $pull: { students: userId } }) // remove from classes
        await Cours.updateMany({ teacher: userId }, { $unset: { teacher: "" } }) // remove from courses
        await Evaluation.deleteMany({ $or: [{ studentId: userId }, { teacherId: userId }] }) // delete evaluations

        const evaluations = await Evaluation.find({ $or: [{ studentId: userId }, { teacherId: userId }] })
        const evalIds = evaluations.map(e => e._id)
        await Cours.updateMany({ evalIds: { $in: evalIds } }, { $pull: { evalIds: { $in: evalIds } } }) // update courses

        res.json({ msg: true, info: "User and related data deleted successfully" })
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg: false, error: "Server error" })
    }
})

// Login user (student/teacher)
app.post("/users/login", (req, res) => {
    User.findOne({ tel: req.body.tel }).then((doc) => {
        console.log("here is doc by tel", doc)
        if (!doc) return res.json({ msg: "please check your tel" })

        bcrypt.compare(req.body.pass, doc.pass).then((result) => {
            console.log("here is pwd compare result", result)
            if (result) {
                let userToSend = {
                    role: doc.role,
                    fName: doc.firstName,
                    lName: doc.lastName,
                    id: doc._id,
                    classeId: doc.classeId,
                    photo: doc.photo,
                }
                let token = jwt.sign(userToSend, secretKey, { expiresIn: "1h" })
                res.json({ msg: "welecome", user: token })
            } else {
                res.json({ msg: "please check your password" })
            }
        })
    })
})

// Login parent
app.post("/users/loginParent", (req, res) => {
    User.findOne({ tel: req.body.tel, role: "parent" }).then((doc) => {
        console.log("here is doc by tel", doc)
        if (!doc) return res.json({ msg: "please check your tel" })

        bcrypt.compare(req.body.pass, doc.pass).then((result) => {
            console.log("here is pwd compare result", result)
            if (result) {
                let userToSend = {
                    role: doc.role,
                    fName: doc.firstName,
                    lName: doc.lastName,
                    id: doc._id
                }
                let token = jwt.sign(userToSend, secretKey, { expiresIn: "1h" })
                res.json({ msg: "welecome", user: token })
            } else {
                res.json({ msg: "please check your password" })
            }
        })
    })
})

// Edit user
app.put("/users/editUser", (req, res) => {
    console.log("here into BL : edit user") // log backend action
    let newUserObj = req.body // get new user data
    console.log("here is newUserObj", newUserObj)
    User.updateOne({ _id: newUserObj._id }, newUserObj).then((updateRes) => {
        console.log("here is updateRes", updateRes)
        if (updateRes.nModified == 1) res.json({ msg: true }) // success
        else res.json({ msg: false }) // no modification
    })
})



// **************************************************Cours*********************************************************

// Get all courses
app.get("/cours/getAllCours", (req, res) => {
    console.log("here into BL : Get ALL cours") // log backend action
    Cours.find().populate('teacher').then((docs) => { // fetch all courses and populate teacher field
        console.log("Here is DB response", docs) // log DB response
        res.json({ tab: docs }) // send response
    })
})

// Get courses By Id
app.get("/cours/getCoursId/:id", (req, res) => {
    console.log("here into BL : Get ALL cours") // log backend action
    Cours.findById(req.params.id).then((doc) => { // fetch cours and populate teacher field
        console.log("Here is DB response", doc) // log DB response
        res.json({ doc: doc }) // send response
    })
})

// Get course name by ID
app.get("/cours/getCoursName/:id", (req, res) => {
    console.log("here into BL : Get cours") // log backend action
    Cours.findById(req.params.id).then((doc) => { // find course by ID
        console.log("Here is DB response", doc) // log DB response
        res.json({ name: doc.name }) // send course name only
    })
})

// Get all courses for a specific Classecours
app.get("/cours/getCoursClasse/:id", (req, res) => {
    console.log("here into BL : Get ALL cours") // log backend action

    Classecours.findById(req.params.id)
        .populate({ // populate courses
            path: 'courses',
            populate: {
                path: 'teacher', // populate teacher inside course
                select: 'firstName lastName _id' // select specific fields
            }
        })
        .then((docs) => {
            if (!docs) { // check if Classecours exists
                console.log("No Classecours found with this id:", req.params.id)
                return res.json({ tab: [] }) // return empty array if not found
            }

            console.log("Here is DB response", docs) // log DB response
            res.json({ tab: docs.courses }) // send courses array
        })
})
// Get all courses for a specific Classe
app.get("/cours/getCoursByClasse/:classeId", async (req, res) => {
    try {
        const classeId = req.params.classeId;

        const classeCours = await Classecours.findOne({ classes: classeId })
            .populate({
                path: 'courses',  
                populate: {
                    path: 'teacher', 
                    select: 'firstName lastName _id'
                }
            });

        if (!classeCours) {
            console.log("No Classecours found for this class id:", classeId);
            return res.json({ tab: [] });
        }

        console.log("Classecours found:", classeCours);
        res.json({ tab: classeCours.courses });

    } catch (err) {
        console.error("Error fetching courses for classe:", err);
        res.status(500).json({ error: "Server error" });
    }
});



// Add new course
app.post("/cours/addCours", (req, res) => {
    console.log("here into BL : post cours") // log backend action

    User.findById({ _id: req.body.teacher }).then((foundTeacher) => { // find teacher
        if (!foundTeacher) { // if teacher not found
            res.json({ msg: "teacher not found" })
        } else {
            const coursObj = new Cours({
                name: req.body.name,
                description: req.body.description,
                coeff: req.body.coeff,
                duration: req.body.duration,
                teacher: foundTeacher._id
            })

            coursObj.save((err, doc) => { // save course
                console.log("here is error add cours", err) // log error if any
                console.log("here is obj add cours avec succes", doc) // log saved doc
                if (doc) {
                    foundTeacher.courses.push(doc._id) // add course ID to teacher
                    foundTeacher.save() // save teacher
                    res.json({ msg: "Add with success" }) // success message
                } else {
                    res.json({ msg: "Error" }) // error message
                }
            })
        }
    })
})

// Delete course and cascade
app.delete("/cours/deleteCours/:id", async (req, res) => {
    try {
        const coursId = req.params.id // get course ID

        // 1. Delete the course
        const deleted = await Cours.deleteOne({ _id: coursId })
        if (deleted.deletedCount === 0) return res.json({ msg: false }) // course not found

        // 2. Delete all evaluations linked to the course
        await Evaluation.deleteMany({ coursId })

        // 3. Remove course from all Classe
        await Classe.updateMany({ courses: coursId }, { $pull: { courses: coursId } })

        // 4. Remove course from all Classecours
        await Classecours.updateMany({ courses: coursId }, { $pull: { courses: coursId } })

        // 5. Remove course from all users (students/teachers)
        await User.updateMany({ courses: coursId }, { $pull: { courses: coursId } })

        res.json({ msg: true }) // success
    } catch (err) {
        console.error("Error cascade deleting cours", err) // log error
        res.status(500).json({ msg: false, error: err }) // server error
    }
})

// Get all courses by teacher
app.get("/cours/getCoursTeacher/:id", (req, res) => {
    console.log("here into BL : get courses by teacher") // log backend action
    Cours.find({ teacher: req.params.id }).then((docs) => { // find courses by teacher ID
        console.log("here is cours from teacher", docs) // log DB response
        res.json({ tab: docs }) // send courses
    })
})

// PUT edit Cours
app.put("/cours/editCours", async (req, res) => {
    try {
        const { _id, name, description, coeff, duration, teacher } = req.body;

        const coursToUpdate = await Cours.findById(_id);
        if (!coursToUpdate) {
            return res.status(404).json({ msg: false, error: "Cours not found" });
        }

        // Update course data
        coursToUpdate.name = name || coursToUpdate.name;
        coursToUpdate.description = description || coursToUpdate.description;
        coursToUpdate.coeff = coeff || coursToUpdate.coeff;
        coursToUpdate.duration = duration || coursToUpdate.duration;

        // If teacher is changed
        if (teacher && teacher !== String(coursToUpdate.teacher)) {
            // Remove course from old teacher
            if (coursToUpdate.teacher) {
                await User.updateOne(
                    { _id: coursToUpdate.teacher },
                    { $pull: { courses: coursToUpdate._id } }
                );
            }

            // Add course to new teacher
            const newTeacher = await User.findById(teacher);
            if (!newTeacher) return res.json({ msg: "Teacher not found" });

            coursToUpdate.teacher = newTeacher._id;
            newTeacher.courses.push(coursToUpdate._id);
            await newTeacher.save();
        }

        const savedCours = await coursToUpdate.save();
        res.json({ msg: true, cours: savedCours });

    } catch (err) {
        console.error("Error editing cours:", err);
        res.status(500).json({ msg: false, error: err });
    }
});



// ************************************************************Classe*********************************************************************

// Add a new classe
app.post("/classe/addClasse", (req, res) => {
    console.log("here into BL : post classe") // log backend action

    // create Classe object
    const classeObj = new Classe({
        name: req.body.name, // name of the class
        level: req.body.level, // level of the class
        students: req.body.students || [], // array of students
    })

    // save Classe
    classeObj.save((err, savedClasse) => {
        if (err || !savedClasse) { // check for error
            console.log("error saving classe:", err)
            return res.json({ msg: "Error saving classe" }) // return error
        }

        // if students are provided, link them to the saved class
        if (req.body.students && req.body.students.length > 0) {
            req.body.students.forEach((studentId) => {
                User.findById(studentId, (err, foundStudent) => {
                    if (foundStudent) {
                        foundStudent.classeId = savedClasse._id // assign class to student
                        foundStudent.save() // save student
                    }
                })
            })
        }

        // create Classecours object to link classes and courses
        const classeCoursObj = new Classecours({
            classes: [savedClasse._id], // link saved class
            courses: req.body.courses || [] // optional courses array
        })

        // save Classecours
        classeCoursObj.save((err2, savedClasseCours) => {
            if (err2 || !savedClasseCours) { // check for error
                console.log("error saving classecours:", err2)
                return res.json({ msg: "Classe saved but error linking courses" })
            }

            // link Classecours to the Classe
            savedClasse.classeCoursId = savedClasseCours._id
            savedClasse.save()

            // if courses are provided, link each course to Classecours
            if (req.body.courses && req.body.courses.length > 0) {
                req.body.courses.forEach((courseId) => {
                    Cours.findById(courseId, (err3, foundCourse) => {
                        if (foundCourse) {
                            foundCourse.classeCoursId = savedClasseCours._id
                            foundCourse.save()
                        }
                    })
                })
            }

            res.json({ msg: "Add with success" }) // success response
        })
    })
})

// Get all classes
app.get("/classe/getAllClasse", (req, res) => {
    console.log("here into BL : Get ALL classe") // log action
    Classe.find().then((docs) => { // fetch all classes
        console.log("Here is DB response", docs) // log DB response
        res.json({ tab: docs }) // return classes array
    })
})
// Get class By Id
app.get("/classe/getClasseId/:id", (req, res) => {
    console.log("here into BL : Get classe") // log action
    Classe.findById(req.params.id).then((doc) => { // fetch all classes
        console.log("Here is DB response", doc) // log DB response
        res.json({ doc: doc }) // return classes array
    })
})

// Get specific class by Classecours ID
app.get("/classe/getClasse/:id", (req, res) => {
    console.log("here into BL : Get ALL classe") // log action
    Classecours.findById(req.params.id).populate('classes').then((docs) => { // populate classes
        console.log("Here is DB response", docs) // log DB response
        res.json({ tab: docs.classes }) // return array of classes
    })
})

// Delete a class and cascade delete related data
app.delete("/classe/deleteClasse/:id", async (req, res) => {
    try {
        const classeId = req.params.id // get class ID

        // 1. Delete the class
        const deleted = await Classe.deleteOne({ _id: classeId })
        if (deleted.deletedCount === 0) return res.json({ msg: false }) // class not found

        // 2. Delete all evaluations related to this class
        await Evaluation.deleteMany({ classeId })

        // 3. Remove class from Classecours
        await Classecours.updateMany({ classes: classeId }, { $pull: { classes: classeId } })

        // 4. Unset classeId from all students
        await User.updateMany({ classeId: classeId }, { $unset: { classeId: "" } })

        // 5. Optional: Unset classeCoursId from related courses
        await Cours.updateMany({ classeCoursId: classeId }, { $unset: { classeCoursId: "" } })

        res.json({ msg: true }) // success
    } catch (err) {
        console.error("Error cascade deleting classe", err) // log error
        res.status(500).json({ msg: false, error: err }) // server error
    }
})

// PUT edit Classe
app.put("/classe/editClasse", async (req, res) => {
    try {
        const { _id, name, level, students } = req.body;

        const classeToUpdate = await Classe.findById(_id);
        if (!classeToUpdate) {
            return res.status(404).json({ msg: false, error: "Classe not found" });
        }

        // Update basic info
        classeToUpdate.name = name || classeToUpdate.name;
        classeToUpdate.level = level || classeToUpdate.level;

        // Update students
        if (students) {
            // Remove classeId from old students not in new list
            const oldStudentIds = classeToUpdate.students.map(s => s.toString());
            const removedStudents = oldStudentIds.filter(id => !students.includes(id));
            await User.updateMany(
                { _id: { $in: removedStudents } },
                { $unset: { classeId: "" } }
            );

            // Add classeId to new students
            const newStudents = students.filter(id => !oldStudentIds.includes(id));
            await User.updateMany(
                { _id: { $in: newStudents } },
                { $set: { classeId: classeToUpdate._id } }
            );

            classeToUpdate.students = students;
        }

        const savedClasse = await classeToUpdate.save();
        res.json({ msg: true, classe: savedClasse });

    } catch (err) {
        console.error("Error editing classe:", err);
        res.status(500).json({ msg: false, error: err });
    }
});




// ****************************************************Evaluation*********************************************************

// Add a new evaluation
app.post("/eval/addEval", async (req, res) => {
    try {
        console.log("here into BL : add Eval") // log backend action

        const objEval = new Evaluation(req.body) // create Evaluation object from request body

        // Check if Teacher exists
        const teacher = await User.findById(objEval.teacherId)
        if (!teacher) return res.json({ msg: "Teacher not found" })

        // Check if Student exists
        const student = await User.findById(objEval.studentId)
        if (!student) return res.json({ msg: "Student not found" })

        // Check if Cours exists
        const cours = await Cours.findById(objEval.coursId)
        if (!cours) return res.json({ msg: "Cours not found" })

        // Check if Classe exists
        const classe = await Classe.findById(objEval.classeId)
        if (!classe) return res.json({ msg: "Classe not found" })

        // Save the Evaluation
        const savedEval = await objEval.save()

        // Link evaluation with Teacher, Student, Cours, Classe
        teacher.evalIds.push(savedEval._id)
        await teacher.save()

        student.evalIds.push(savedEval._id)
        await student.save()

        cours.evalIds.push(savedEval._id)
        await cours.save()

        classe.evalIds.push(savedEval._id)
        await classe.save()

        return res.json({ msg: "Evaluation added successfully", eval: savedEval })

    } catch (err) {
        console.error("Error add Evaluation", err) // log error
        return res.status(500).json({ msg: "Server error" }) // server error response
    }
})

// Get evaluations of a student with all related data
app.get("/eval/getEval/:id", (req, res) => {
    Evaluation.find({ studentId: req.params.id })
        .populate({
            path: "coursId", // populate course
            populate: {
                path: "teacherId", // populate teacher of the course
                select: "firstName lastName email" // select only needed fields
            }
        })
        .populate("teacherId", "firstName lastName email") // populate teacher of the evaluation
        .populate("studentId", "firstName lastName email") // populate student
        .populate("classeId", "name level") // populate class info
        .then((foundEvals) => {
            if (!foundEvals || foundEvals.length === 0) {
                return res.json({ msg: "No evaluations found" }) // no evaluations found
            }
            return res.json({ obj: foundEvals }) // return evaluations
        })
        .catch((err) => {
            console.log("Error fetching evaluations", err) // log error
            return res.status(500).json({ msg: "Server error" }) // server error
        })
})

// Compare number of evaluations vs number of courses in a class for a student
app.get("/eval/compare/:classeId/:studentId", async (req, res) => {
    try {
        const { classeId, studentId } = req.params

        // Get all courses for the class
        const classeCours = await Classecours.findOne({ classes: classeId })
            .populate("courses", "_id")

        if (!classeCours) {
            return res.json({ result: false, msg: "No ClasseCours found" })
        }

        const allCoursesCount = classeCours.courses.length

        // Get all evaluations of this student in the class
        const studentEvals = await Evaluation.find({
            classeId: classeId,
            studentId: studentId
        })

        // Check if the student has evaluations for all courses
        const isComplete = studentEvals.length === allCoursesCount

        res.json({ result: isComplete })
    } catch (err) {
        console.error("Error compare evals:", err) // log error
        res.status(500).json({ result: false, msg: "Error" }) // server error
    }
})

// Calculate average (moyenne) for a student
app.get("/eval/moyenne/:studentId", async (req, res) => {
    try {
        const studentId = req.params.studentId

        // Get all evaluations of the student
        const evals = await Evaluation.find({ studentId })
            .populate("coursId", "coeff name") // get course coeff and name

        if (!evals || evals.length === 0) {
            return res.json({ moyenne: null, msg: "No evaluations found" })
        }

        let sommeNotes = 0
        let sommeCoeff = 0

        // Calculate weighted average
        evals.forEach(ev => {
            if (ev.coursId) {
                const coeff = ev.coursId.coeff || 1
                const note = ev.note || 0

                sommeNotes += note * coeff
                sommeCoeff += coeff
            }
        })

        let moyenne = null
        if (sommeCoeff > 0) {
            moyenne = (sommeNotes / sommeCoeff).toFixed(2) // fix to 2 decimals
        }

        // Update moyenne in User
        await User.findByIdAndUpdate(studentId, { moyenne: moyenne })

        res.json({ moyenne: moyenne })
    } catch (err) {
        console.error("Error calculating moyenne:", err) // log error
        res.status(500).json({ msg: "Error" }) // server error
    }
})

=======
const express = require("express");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/todoDB');

const app = express();


// make app
module.exports = app;

app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/todoDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Model
const Todo = mongoose.model("Todo", new mongoose.Schema({
  title: String,
  completed: Boolean,
}));

// Routes
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.json(todo);
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});
>>>>>>> 9f685caed91c7db03b6ec1cf424982bb65cd5b9c
