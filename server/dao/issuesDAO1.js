import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let issues


export default class issuesDAO1 {
    static async injectDB(conn) {
        if (issues) {
            return
        } try {
            issues = await conn.db(process.env.MOVIEREVIEWS_NS)
                .collection('movies')
        } catch (e) {
            console.error(`unable to connect in MoviesDAO: ${e}`)
        }
    }

    static async getIssues({// default filter
        filters = null,
        page = 0,
        issuesPerPage = 20, // will only get 20 issues at once
    } = {}) {
        let query
        if (filters) {
            if ("title" in filters) {
                query = { $text: { $search: filters['title'] } }
            } else if ("rated" in filters) {
                query = { "rated": { $eq: filters['rated'] } }
            }
        }
        let cursor
        try {
            cursor = await issues
                .find(query)
                .limit(issuesPerPage)
                .skip(issuesPerPage * page)
            const issuesList = await cursor.toArray()
            const totalNumIssues = await movies.countDocuments(query)
            return { issuesList, totalNumIssues }
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { issuesList: [], totalNumIssues: 0 }
        }
    }

    static async getIssueByID(id) {
        try {
            const pipeline = [
                {
                    $match: {
                        _id: new ObjectId(id),
                    },
                },
                {
                    $lookup: {
                        from: "reviews",
                        let: {
                            id: "$_id",
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$restaurant_id", "$$id"],
                                    },
                                },
                            },
                            {
                                $sort: {
                                    date: -1,
                                },
                            },
                        ],
                        as: "reviews",
                    },
                },
                {
                    $addFields: {
                        reviews: "$reviews",
                    },
                },
            ]
            return await issues.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Something went wrong in getIssueByID: ${e}`)
            throw e
        }
    }
}


