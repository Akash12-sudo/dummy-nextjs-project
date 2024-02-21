import mongoose, { Schema, Model } from "mongoose";
const URI = process.env.MONGODB_URI;

try {
  if (URI) {
    mongoose.connect(URI);
    mongoose.Promise = global.Promise;
  }
} catch (error) {
  console.error("error in mongoose connect");
}

const blogSchema = new Schema(
  {
    author: String,
    title: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

const BlogModel = mongoose.models.blogs || mongoose.model("blogs", blogSchema);
export default BlogModel;
