import passport from "passport";
import fbStrategy from "passport-facebook";
import { UserModel } from "../dao/models/User.js";
import dotenv from "dotenv";
dotenv.config();

const FacebookStrategy = fbStrategy.Strategy;

//Verificando envs.
//callbackURL chequeando.

const initialiazePassportConfig = () => {
  passport.use(
    "facebook",
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "https://7af4-190-246-181-245.ngrok.io/home",
        profileFields: ["id", "displayName", "photos", "emails"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(accessToken);
          console.log(profile);
          if (!user) throw new Error("Not found user.");
          const fullName = profile.displayName.split("");
          await UserModel.findByIdAndUpdate(user._id, {
            avatar: profile.photos[0].value,
            firstName: fullName[0],
            lastName: fullName[1],
          });
          done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    UserModel.findById(id, done);
  });
};
export default initialiazePassportConfig;
