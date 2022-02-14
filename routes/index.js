const router = require('express').Router();
const smartphonsRoutes = require('./smartphons');

router.use('/smartphons', smartphonsRoutes);

module.exports = router;
