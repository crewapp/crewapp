var router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/groups', require('./groups'));

module.exports = router;
