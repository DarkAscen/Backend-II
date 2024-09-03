import passport from "passport";
import localStrategy from "passport-local";
import jwt from "passport-jwt";

import { userModel } from "../models/user.model.js";
import { hashPassword} from "../utils/hashpass.js";
import { config } from "./config.js";

const LocalStrategy = localStrategy.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

function CookieExtractor(req) {
    let token = null;

    if (req && req.cookies) {
        token = req.cookies.token;
    }
    console.log("CookieExtractor", token);

    return token;
}

export function initializePassport() {
    passport.use("register", new LocalStrategy({
        usernameField: "email",
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            const { first_name, last_name, age, role, cartId } = req.body;

            if (!first_name || !last_name || !age || !role || !cartId) {
                return done(null, false, { message: "You must enter all the fields" });
            };

            const userExists = await userModel.findOne({ email });

            if (userExists) {
                return done(null, false, { message: "The user already exists" });
            }

            const hashedPassword = await hashPassword(password);

            const user = await userModel.create({ first_name, last_name, email, age, password: hashedPassword, role, cartId });

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.use("login", new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            const user = await userModel.findOne({ email });

            if (!user) {
                return done(null, false, { message: "User not found" });
            }

            const isPasswordValid = await user.comparePassword(password);

            if (!isPasswordValid) {
                return done(null, false, { message: "Incorrect password" });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id);

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    });

    passport.use("current", new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([CookieExtractor]),
        secretOrKey: config.JWT_SECRET,
    }, async (payload, done) => {
        try {
            done(null, payload);
        } catch (error) {
            return done(error);
        }
    }));
};