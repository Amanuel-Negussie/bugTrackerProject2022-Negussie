import CommentsDAO from "../dao/commentsDAO.js"



export default class CommentsController {
    static async apiGetComments(req, res, next) {
        const commentsPerPage = req.query.commentsPerPage ? parseInt(req.query.commentsPerPage) : 20
        const page = req.query.page ? parseInt(req.query.page) : 0
        let filters = {}
        if (req.query.userid) {
            filters.userid = req.query.userid
        } else if (req.query.user_name) {
            filters.user_name = req.query.user_name
        } else if (req.query.comment) {
            filters.comment = req.query.comment
        }

        const { commentsList, totalNumComments } = await CommentsDAO.getComments({
            filters, page,
            commentsPerPage
        })

        let response = {
            issues: commentsList,
            page: page,
            filters: filters,
            entries_per_page: commentsPerPage,
            total_results: totalNumComments,
        }
        res.status(200).json(response)
    }


    static async apiPostComment(req, res, next) {
        try {
            const issue_id = req.body.issue_id
            const userid = req.body.userid
            const user_name = req.body.user_name
            const comment = req.body.comment
            const date = new Date ()

            await CommentsDAO.addComments(
                issue_id,
                userid,
                user_name,
                comment,
                date
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetIssuesById(req, res, next) {
        try {
            let id = req.params.id || {}
            let issues = await CommentsDAO.getIssuesByID(id)
            if (!issues) {
                res.status(404).json({ error: "Not found" })
                return
            }
            res.json(issues)
        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }


    static async apiUpdateComment(req, res, next) {
        try {
          const commentId = req.body._id
          const comment = req.body.comment
          const date = new Date()
    
          const commentResponse = await CommentsDAO.updateComment(
            commentId,
            comment,
            date,
          )
    
          var { error } = commentResponse
          if (error) {
            res.status(400).json({ error })
          }
    
          if (commentResponse.modifiedCount === 0) {
            throw new Error(
              "unable to update comment - user may not be original poster",
            )
          }
    
          res.json({ status: "success" })
        } catch (e) {
          res.status(500).json({ error: e.message })
        }
      }


}