import { ObjectId } from 'mongodb';
import mongoose from 'mongoose'




const CommentsSchema = new mongoose.Schema({
      issue_id: ObjectId,
      userid: {type: String, minLength: 10, maxlength: 25, required: [true, "A valid userid is required and must be 10 to 25 characters long."]},
      user_name: { type: String, minlength:10, maxlength:35, required: [true, 'A valid user_name is required must be 10 to 35 characters long']},
      comment: { type: String,minlength:15, maxlength:350, required: [true, 'A valid comment is required and must be between 15 to 350 characters long.']},
      createdDate: { type: Date, default: Date.now },
      last_updated_date: {type: Date, default: Date.now }
}
);

export default mongoose.model('Comments', CommentsSchema)