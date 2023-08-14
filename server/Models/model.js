const {mongoose, Schema} = require ('mongoose');

const userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    require: true,
    min: 4
  },
  password: {
    type: String,
    require: true
  },
});

module.exports = mongoose.model('User', userSchema);