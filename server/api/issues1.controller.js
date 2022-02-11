import issuesDAO1 from "../dao/issuesDAO1.js"



export default class IssuesController1 {
    static async apiGetIssues(req, res, next) {
        const issuesPerPage = req.query.issuesPerPage ? parseInt(req.query.issuesPerPage) : 20
        const page = req.query.page ? parseInt(req.query.page) : 0
        let filters = {}
        if (req.query.rated) {
            filters.rated = req.query.rated
        } else if (req.query.title) {
            filters.title = req.query.title
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
            

            const ReviewResponse = await issuesDAO1.apiCreateIssue(
                req
            )
            return res.json({ status: "success" })
        } catch (e) {
            return res.status(500).json({ error: e.message })
        }
    }

}