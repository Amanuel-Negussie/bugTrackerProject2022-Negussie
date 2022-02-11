import mongoose from 'mongoose'


const IssueSchema = new mongoose.Schema({
        title: { type: String, required: true },
        body: { type: String, required: true },
        tags: { type: [String], required: true },
        users: { type: [String], required: true },
        priority: { type: String, default: "unassigned" },
        status: { type: String, default: "todo" },
        updates: [Object],
        createdDate: {type: Date, default: Date.now}
  }
  );
  
  export default mongoose.model('Issue', IssueSchema)