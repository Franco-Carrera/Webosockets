import passport from "passport";
import fbStrategy from "passport-facebook";
import { userModel } from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

const FacebookStrategy = fbStrategy.Strategy;

//Verificar si esos env van en archivo o vienen desde FB

const initialiazePassportConfig = () => {
  passport.use(
    "facebook",
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "",
        profileFields: ["emails"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(accessToken);
          console.log(profile);
          const user = await userModel.findOne({
            email: profile.emails[0].value,
          });
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
    userModel.findById(id, done);
  });
};
export default initialiazePassportConfig;
