const router = require('express').Router()
const passport = require('passport')
const secretKey = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const FRONTEND_LOGIN_URL = process.env.FRONTEND_LOGIN_URL

// GOOGLE

router.get('/google', passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email']
}))

router.get('/google/callback', (req, res) => {
    return providerLogin(req, res, 'google')
});

// GITHUB

router.get('/github', passport.authenticate('github', {
    session: false
}))

router.get('/github/callback', (req, res) => {
    return providerLogin(req, res, 'github')
});

const providerLogin = (req, res, providerName) => {

    passport.authenticate(
        providerName,
        { session: false },
        (error, user) => {

            if (error || !user) {
                return res.redirect(FRONTEND_LOGIN_URL + '?login_status=FAILED_ERROR')
            }

            const payload = {
                id: user._id,
                expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS),
            }

            req.login(payload, { session: false }, (error) => {

                if (error) {
                    return res.redirect(FRONTEND_LOGIN_URL + '?login_status=FAILED_TOKEN_SIGNING')
                }

                const token = jwt.sign(JSON.stringify(payload), secretKey)
                return res.redirect(FRONTEND_LOGIN_URL + '?login_status=SUCCESS&&token=' + token)
            })
        },
    )(req, res)
}

module.exports = router