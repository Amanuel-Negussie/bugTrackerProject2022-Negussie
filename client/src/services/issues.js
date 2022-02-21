import http from "../http-common"

class IssueDataService{ 

getAll(page = 0)
{
    return http.get(`/issues/issues?page=${page}`);
}


}

export default new IssueDataService ();