const Router = require("express-promise-router");
const rateLimit = require('express-rate-limit');

const linkController = require("../controller/link");

const router = new Router;

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP address, please try again later.'
});

router.get('/countLink', linkController.countLink);
router.get('/:id', linkController.getShortUrl);
router.post('/', limiter, linkController.addLink);

module.exports = router;