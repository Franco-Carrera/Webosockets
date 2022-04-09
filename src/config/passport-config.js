import passport from "passport";
import local from "passport-local";
import { userService } from "../services/services.js";
import { cookieExtractor } from "../utils.js";
import jwt from "passport-jwt";
import config from "./config.js";
import { PORT } from "./config.js";
import { createTransport } from "nodemailer";
import loggerHandler from "../middlewares/loggerHandler.js";
const logger = loggerHandler();

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;

const transport = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.session.ADMIN,
    pass: config.session.APP_PWD,
  },
});

//config added, add public and new index socket .

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email", session: false },
      async (req, username, password, done) => {
        try {
          let { first_name, last_name, email, phone, address, age, cart } =
            req.body;

          if (!req.file)
            return done(null, false, { messages: "Couldn't upload avatar" });

          const userFound = await userService.getByMail({ email: email });
          if (userFound)
            return done(null, false, { messages: "User Already exists" });

          const newUser = {
            first_name,
            last_name,
            email,
            password: await userService.encryptPassword(password),
            username,
            phone, //phone + prefix,
            address,
            age: parseInt(age),
            cart: [
              { id: "6238c035417fb9e2ba3beda8" },
              { id: "623a8da8933806ce1ea6b6db" },
            ],
            role: "user",
            avatar: `${req.protocol}://${req.hostname}:${PORT}/uploads/${req.file.filename}`,
          };

          const mail = {
            from: "Initial Api-commerce <Api E-commerce>",
            to: config.session.ADMIN,
            subject: "Nuevo registro",
            html: `
                    <h1>Se ha registrado un nuevo usuario</h1>
                    <p>${JSON.stringify(newUser)}</p>
                `,
          };
          let emailResult = await transport.sendMail(mail);
          let result = await userService.add(newUser);

          logger.info(
            "Email has been sent to the new user for new registration."
          );

          return done(null, result);
        } catch (err) {
          logger.error(err.message);
          return done(err);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          logger.info(username);
          logger.info(password);
          if (
            username === config.session.ADMIN &&
            password === config.session.PASSWORD
          ) {
            return done(null, { id: 0, role: "admin" });
          }

          const user = await userService.getOne({ email: username }); //+populate rol
          if (!user) return done(null, false, { messages: "User not found." });

          const isValidPassword = await userService.comparePassword(
            password,
            user.password
          );
          if (!isValidPassword)
            return done(null, false, {
              messages: "Not valid username or password.",
            });

          return done(null, user);
        } catch (err) {
          logger.error(err.message);
          return done(err);
        }
      }
    )
  );
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: config.jwt.SECRET,
      },
      async (jwt_payload, done) => {
        try {
          if (jwt_payload.role === "admin") return done(null, jwt_payload);

          const user = await userService.getOne({ _id: jwt_payload._id }); //changing getBy
          if (!user) return done(null, false, { messages: "Not found user." });

          return done(null, user);
        } catch (err) {
          logger.error(err.message);
          return done(err);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    let result = await userService.getId({ _id: id });
    done(null, result);
  });
};

export default initializePassport;
