const express = require("express");
const router = express.Router();

const { getActivities, getActivity, createActivity, modifyActivity, deleteActivity } = require("../controlers/aktivnost");
const { validateActivityDb } = require("../middlewares/validation");

router.route("/")
    .get(getActivities)
    .post(validateActivityDb, createActivity);

router.route("/:id")
    .get(getActivity)
    .put(validateActivityDb, modifyActivity)
    .delete(deleteActivity);

module.exports = router;
