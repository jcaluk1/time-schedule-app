const express = require("express");
const router = express.Router();

const {
    getActivites,
    postActivity,
    deleteActivity
} = require("../controlers/activities");

const {
    requestActivites
} = require("../middlewares/requestItems");

const { validateActivity } = require("../middlewares/validation.js");

router.get("/aktivnosti", requestActivites, getActivites);
router.post("/aktivnost", validateActivity, requestActivites, postActivity);
router.delete("/aktivnost/:naziv", requestActivites, deleteActivity);

module.exports = router;
