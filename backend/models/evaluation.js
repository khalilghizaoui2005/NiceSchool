const mongoose = require("mongoose");


const evaluationSchema = mongoose.Schema({
    note: Number,
    eval: String,
    coursId: { type: mongoose.Schema.Types.ObjectId, ref: "Cours" },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    classeId: { type: mongoose.Schema.Types.ObjectId, ref: "Classe" },
})

const evaluation = mongoose.model("Evaluation", evaluationSchema);
module.exports = evaluation;