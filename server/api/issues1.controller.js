import issuesDAO1 from "../dao/issuesDAO1.js"



export default class IssuesController1 {
    static async apiGetIssues(req, res, next) {
        const issuesPerPage = req.query.issuesPerPage ? parseInt(req.query.issuesPerPage) : 20
        const page = req.query.page ? parseInt(req.query.page) : 0
        let filters = {}
        if (req.query.title) {
            filters.title = req.query.title
        } else if (req.query.body) {
            filters.body = req.query.body
        } else if (req.query.tags){
            filters.tags = req.query.tags 
        } else if (req.query.users){
            filters.users = req.query.users
        } else if (req.query.priority){
            filters.priority = req.query.priority
        }
    
        const { issuesList, totalNumIssues } = await issuesDAO1.getIssues({
            filters, page,
            issuesPerPage
        })

        let response = {
            issues: issuesList,
            page: page,
            filters: filters,
            entries_per_page: issuesPerPage,
            total_results: totalNumIssues,
        }
        res.status(200).json(response)
    }




    static async apiPostIssue(req, res, next) {
        try {
            

             await issuesDAO1.apiCreateIssue(
                req
            )
            return res.json({ status: "success" })
        } catch (e) {
            return res.status(500).json({ error: e.message })
        }
    }

    static async apiGetIssuesById(req, res, next) {
        try {
          let id = req.params.id || {}
          let issues = await issuesDAO1.getIssuesByID(id)
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
    

}