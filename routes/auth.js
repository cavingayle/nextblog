const express = require('express')

const router = express.Router()

// import from controllers

const { register} = require('../controller/auth') // importing the register function from 

router.post('/register', register )


module.exports = router;