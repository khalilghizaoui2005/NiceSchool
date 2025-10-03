const mongoose = require("mongoose");

const classeCoursSchema = new mongoose.Schema({
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Classe" }],
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cours" }],
});

const Classecours = mongoose.model("Classecours", classeCoursSchema);
module.exports = Classecours;
