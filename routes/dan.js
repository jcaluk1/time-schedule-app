const express = require("express");
const router = express.Router();

const { getDays, getDay, createDay, modifyDay, deleteDay } = require("../controlers/dan");

router.route("/")
    .get(getDays)
    .post(createDay);

router.route("/:id")
    .get(getDay)
    .put(modifyDay)
    .delete(deleteDay);

module.exports = router;
