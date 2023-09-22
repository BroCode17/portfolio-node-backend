const router = require('express').Router();
const {sendEmail, } = require('../controller/appController')

router.post('/send', sendEmail)


module.exports = router