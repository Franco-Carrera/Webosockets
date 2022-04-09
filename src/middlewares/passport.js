import passport from 'passport'

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err)
      if (!user) return res.status(500).json({ message: info.message })
      req.user = user
      next()
    })(req, res, next)
  }
}

export const checkAuthorization = (roles) => {
  return async (req, res, next) => {
    if (!req.user) return res.send({ error: 'Not authorized.' })
    if (roles.includes(req.user.role)) next()
    else res.status(403).json({ message: 'User don\'t have permissions.' })
  }
}
