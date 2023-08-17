const {mongoose, Schema} = require ("mongoose");

const postSchema = new Schema(
  {
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: { 
      type: Schema.Types.ObjectId, 
      ref: "User",
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Post' , postSchema);