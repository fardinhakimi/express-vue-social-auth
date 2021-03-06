const router = require('express').Router()
const httpStatus = require('http-status-codes')
const passport = require('passport')

/**
 * Use passport-jwt strategy to authenticate incoming requests hitting this resource
 * 
 * @param req
 * @param res
 * @return json
 */
router.get('/user', passport.authenticate('jwt', { session: false }),(req, res)=> {

    try {

        console.log(req.headers)

        res.status(httpStatus.OK).json({
            'user' :req.user
        })
        
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json([error])
    }
})

module.exports = router