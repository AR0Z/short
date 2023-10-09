const router = require("express").Router();

const LinkRouter = require('./link');

router.use("/link", LinkRouter);

module.exports = router;