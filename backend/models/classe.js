const mongoose = require("mongoose");

const classeSchema = new mongoose.Schema({
    name: String,
    level: String,
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    classeCoursId: { type: mongoose.Schema.Types.ObjectId, ref: "ClasseCours" },
    evalIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Evaluation" }],
});

const Classe = mongoose.model("Classe", classeSchema);
module.exports = Classe;
