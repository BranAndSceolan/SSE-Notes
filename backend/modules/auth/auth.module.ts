import {Request, Response} from "express";
import session from "express-session";
import {NextFunction} from "express/ts4.0";



export class AuthModule {

    constructor() {
    }

    async register(req: Request, res: Response) {

        if (newUser){
            req.session.signInName = registerName;
            res.status(200).send("Congratulations! You are now registered!")
        } else {
            res.status(500).send("Something went wrong registering!")
        }
    }

    async login(req: Request, res: Response) {

        if (user && signInPass == user.password) {
            req.session.signInName = signInName;
            res.sendStatus(200);
        } else {
            res.status(404);
            res.contentType("text/urilist");
            res.send("Your name or password seem to be wrong.");
        }

    }

    logOut(req: Request, res: Response): void {
        req.session.destroy(() => {
            res.clearCookie("connect.sid");
            res.sendStatus(200);
        });
    }

    checkLogin(req: Request, res: Response, next: NextFunction) {
        if (req.session.name) {
            if (req.body.name && req.body.name != req.session.name){
                res.status(401)
            }else {
                next()
            }
        } else {
            res.status(401)
        }
    }

}
