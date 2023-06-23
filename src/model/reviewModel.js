import mongoose from "mongoose";
const { Schema, model } = mongoose;
const objectId = mongoose.Schema.Types.ObjectId;
const reviewSchema = new Schema({
    bookId: {
        type: objectId,
        ref: 'Book',
        required: true,
    },
  reviewedBy: {
    type: String,
    require: true,
    default: "Guest",
    value: {
      type: String,
      required: true,
        
    }
  },
        reviewedAt: {
            type: Date,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
          },
          review: {
            type: String
          },
          isDeleted: {
            type: Boolean,
            default: false
          }
    
}, {timestamps: true})

const ReviewModel = model('Review', reviewSchema);

export default  ReviewModel;
