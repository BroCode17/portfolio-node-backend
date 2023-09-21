const router = require('express').Router();
const {signup} = require('../controller/appController')

router.post('/send/a', signup)