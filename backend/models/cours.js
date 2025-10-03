const mongoose = require("mongoose");

const coursSchema = new mongoose.Schema({
    name: String,
    description: String,
    duration: Number,
    coeff: Number,
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // role : teacher
    classeCoursId: { type: mongoose.Schema.Types.ObjectId, ref: "ClasseCours" }, // role : teacher
    evalIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Evaluation" },] // role : teacher
});
const cours = mongoose.model("Cours", coursSchema);
module.exports = cours;