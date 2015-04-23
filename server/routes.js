var router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/groups', require('./groups'));
router.use('/question', require('./question'));

module.exports = router;
