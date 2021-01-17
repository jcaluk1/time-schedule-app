const express = require("express");
const router = express.Router();

const { getTypes, getType, createType, modifyType, deleteType } = require("../controlers/tip");

router.route("/")
    .get(getTypes)
    .post(createType);

router.route("/:id")
    .get(getType)
    .put(modifyType)
    .delete(deleteType);

module.exports = router;
