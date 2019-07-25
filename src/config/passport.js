const JWTStrategy = require('passport-jwt').Strategy
const googleStrategy = require('passport-google-oauth20').Strategy
const gitHubStrategy = require('passport-github').Strategy;
const User = require('../models/User')
const secretKey = process.env.SECRET_KEY

const SERVER_BASE_URL = process.env.SERVER_BASE_URL

module.exports = (passport) => {

    // JWT STRATEGY

    passport.use(new JWTStrategy({ jwtFromRequest: req => req.cookies.jwt, secretOrKey: secretKey },

        (jwtPayload, done) => {

            if (Date.now() > jwtPayload.expires) {
                return done('jwt expired')
            }

            return done(null, jwtPayload)
        }
    ))

    // GOOGLE STRATEGY

    passport.use(new googleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: SERVER_BASE_URL + '/auth/google/callback'
    },

        async (accessToken, refreshToken, profile, done) => {

            try {

                const email = profile.emails[0].value;

                // check if user already exists
                let user = await User.findOne({ email: email });

                if (user) {
                    return done(null, user);
                }

                const { familyName, givenName } = profile.name

                user = new User(
                    {
                        email: email,
                        name: `${givenName} ${familyName}`,
                        googleId: profile.id,
                        googleProfileJson: profile._json
                    }
                )

                user = await user.save();

                return done(null, user);

            } catch (error) {

                return done(error)
            }
        }
    ))

    // GITHUB STRATEGY

    passport.use(new gitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_SECRET_KEY,
        callbackURL: SERVER_BASE_URL + '/auth/github/callback'
    },
        async (accessToken, refreshToken, profile, done) => {

            try {

                let user = await User.findOne({ email: profile._json.email });

                if (user) {
                    return done(null, user);
                }

                user = new User(
                    {
                        email: profile._json.email,
                        name: profile._json.name,
                        githubId: profile.id,
                        githubProfileJson: profile._json
                    }
                )

                user = await user.save();

                return done(null, user);

            } catch (error) {
                return done(error)
            }
        }
    ))

    // SERIALIZER AND DESERIALIZER

    passport.serializeUser(function (user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function (obj, cb) {
        cb(null, obj);
    });
}


