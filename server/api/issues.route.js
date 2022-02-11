import express from "express"
import IssuesController from "./issues.controller.js"
import ReviewsController from "./reviews.controller.js"
import IssuesController1 from "./issues1.controller.js"




const router = express.Router()

router.route("/").get(IssuesController.apiGetIssues)
router.route("/id/:id").get(IssuesController.apiGetRestaurantById)
router.route("/cuisines").get(IssuesController.apiGetRestaurantCuisines)


router.route("/issues").get(IssuesController1.apiGetIssues)
router.route("/issues").post(IssuesController1.apiPostIssue)

router
  .route("/review")
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview)


export default router 