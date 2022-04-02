const mongoose = require('mongoose')
const watchListSchema = new mongoose.Schema({
  id: { type:Number, required: true },  
  type: { type: String, required: true },
}, {
  timestamps: true,
  versionKey:false
})

module.exports = mongoose.model('watchList', watchListSchema);