const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    tel: String,
    adr: String,
    pass: String,
    photo: String,
    cv: String,
    spec: String,
    valide: String,
    role: String,
    moyenne:Number,
    classeId: { type: mongoose.Schema.Types.ObjectId, ref: "Classe" },
    courses: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Cours" },
    ],
    evalIds: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Evaluation" },
    ]
})

const user = mongoose.model("User", userSchema);
module.exports = user;