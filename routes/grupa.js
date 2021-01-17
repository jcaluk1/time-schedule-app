const express = require("express");
const router = express.Router();

const { getGroups, getGroup, createGroup, modifyGroup, deleteGroup } = require("../controlers/grupa");

router.route("/")
    .get(getGroups)
    .post(createGroup);

router.route("/:id")
    .get(getGroup)
    .put(modifyGroup)
    .delete(deleteGroup);

module.exports = router;
