import passport from "passport";

export function authorize(roles) {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized",
            }); 
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        next();
    };
};

export function authenticate(strategy) {
    return async (req, res, next) => {
        passport.authenticate(strategy, {session: false }, async (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.status(401).json({
                    message: info.messages ? info.messages : info.toString().split(": ")[1],
                });
            }

            req.user = user;
            next();
        })(req, res, next);
    };
};