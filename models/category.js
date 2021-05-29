const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;


const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: true,
    max: 32,
  },
  slug: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,
    require: true,
    max: 32,
  },
  image: {
      url: String,
      key: String

    },
  
    content: {
        type: {},
        min: 20,
        max: 2000000
    },
    postedBy: {
        type: ObjectId,
        ref: 'User'

    }
},{timestamps: true});

module.exports = mongoose.model('Category', categorySchema)