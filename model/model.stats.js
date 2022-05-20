const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const statsSchema = new Schema({
    city : {
        type: String,
        required:true
    },
    cases : {
        type: Number,
        required:true
    },
},{timestamps:true});
const stats = mongoose.model('stats',statsSchema);
module.exports = stats;