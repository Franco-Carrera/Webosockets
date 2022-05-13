import config from "../config/config.js";
import passport from "passport";

// export const isValidPassword = (user, password) =>
//   bcrypt.compareSync(password, user.password); passconfig
export const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[config.jwt.cookie_name];
  }
  return token;
};

export const serialize = (object, keys) => {
  let serializedObject = Object.fromEntries(
    Object.entries(object).filter((pair) => keys.includes(pair[0]))
  );
  serializedObject.id = object._id;
  return serializedObject;
};

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res
          .status(401)
          .send({ error: info.messages ? info.messages : info.toString() });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};
