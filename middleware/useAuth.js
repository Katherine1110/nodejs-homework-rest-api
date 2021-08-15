const passport = require('passport')

const useAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, () => {

  })
}

module.exports = useAuth
