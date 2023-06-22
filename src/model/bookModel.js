import mongoose from "mongoose";
const objectId = mongoose.Schema.Types.ObjectId;
const { Schema, model } = mongoose;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    excerpt: {
      type: String,
      require: true,
    },
    userId: {
      type: objectId,
      required: true,
      ref: "User",
    },
    ISBN: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    reviews: {
      type: Number,
      default: 0,
      comment: "Holds the number of reviews of this book",
    },
    deletedAt: {
      type: Date,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    releasedAt: {
      type: Date,
      required: true,
      validate: {
        validator: function (date) {
          return /^\d{4}-\d{2}-\d{2}$/.test(date);
        },
        message: 'Invalid date format. Must be in "YYYY-MM-DD" format.',
      },
    },
  },
  { timestamps: true }
);

const BookModel = model("Book", bookSchema);

export default BookModel;
