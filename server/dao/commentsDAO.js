import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
import CommentsSchema from "../models/comments.model.js"

let comments

export default class CommentsDAO {
  static async injectDB(conn) {
    if (comments) {
      return
    }
    try {
      comments = await conn.db(process.env.ISSUES_NS).collection("comments")
     
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async getComments({// default filter
    filters = null,
    page = 0,
    commentsPerPage = 20, // will only get 20 issues at once
} = {}) {
    let query
    if (filters) {
        if ("comment" in filters) {
            query = { $text: { $search: filters['comment'] } }
        } else if ("userid" in filters) {
            query = { "userid": { $eq: filters['userid'] } }
        } else if ("user_name" in filters) {
            query = { "user_name": { $eq: filters['user_name'] } }
        }
        else {

        }
    }
    let cursor
    try {
        cursor = await comments
            .find(query)
            .limit(commentsPerPage)
            .skip(commentsPerPage * page)
        const commentsList = await cursor.toArray()
        const totalNumComments = await comments.countDocuments(query)
        return { commentsList, totalNumComments}
    } catch (e) {
        console.error(`Unable to issue find command, ${e}`)
        return { commentsList: [], totalNumComments: 0 }
    }
}


  static async addComments(issue_id,userid, user_name, comment, createdDate) {
    try {
      const commentDoc = {
          issue_id: ObjectId(issue_id),
          userid: userid,
          user_name: user_name,
          comment : comment,
          last_updated_date: createdDate,
          created_date: createdDate,
         
      }
      
      const newComment = await new CommentsSchema(commentDoc)
      
      return await comments.insertOne(newComment)
    } catch (e) {
      console.error(`Unable to post comment: ${e}`)    
      throw (e)
    }
  }

  static async updateComment(commentId, comment, date) {
    try {
      const updateResponse = await comments.updateOne(
        { _id: ObjectId(commentId) },
        { $set: { comment: comment, last_updated_date: date } },
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)

      return { error: e }
    }
  }

  static async deleteComment(commentId, userId) {

    try {
      const deleteResponse = await comments.deleteOne({
        _id: ObjectId(commentId),
        userid: userId,
      })
      
      return deleteResponse
    } catch (e) {
      console.log(_id)
      console.log(_id)
      console.error(`Unable to delete comment: ${e}`)
      return { error: e }
    }
  }

}