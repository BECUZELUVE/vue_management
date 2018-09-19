var mongoose = require("mongoose");
module.exports = mongoose.model("User", {
    id: Number,
    name: String,
    age: Number,
    tel: String,
    sex: String,
    job: String
})