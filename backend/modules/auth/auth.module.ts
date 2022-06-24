import {Request, Response} from "express";
import {NextFunction} from "express/ts4.0";
import {client} from "../../index";


export class AuthModule {

    constructor() {
    }

    async register(req: Request, res: Response) {
        let newUsername = undefined
        let newPassword = undefined
        // check for validity
        if (req.body.name.trim() && req.body.password.trim()){
            newPassword = req.body.password.trim()
            newUsername = req.body.name.trim()
        } else {
            res.status(400).send("name and password need to be sensible values")
        }
        // check if already used
        try {
            const result = await client.query('SELECT FROM users(name) VALUES($1)', [newUsername])
            if (result.length > 0) {
                return res.status(400).send("This name isn't available!")
            }
        } catch (err){
            return res.status(500).send("Something went wrong registering!")
        }

        try {
            const result = await client.query('INSERT INTO users(name, password) VALUES($1, $2) RETURNING *', [newUsername, newPassword])
            if (result){
                req.session.signInName = newUsername;
               return res.status(200).send("Congratulations! You are now registered!")
            } else {
               return res.status(500).send("Something went wrong registering!")
            }
        } catch (err) {
            return res.status(500).send("Something went wrong!")
        }
    }

    async login(req: Request, res: Response) {
        let username : string | undefined = req.body.name.trim()
        let password : string | undefined = req.body.password.trim()
        let result = undefined
        try {
            result = await client.query('INSERT INTO users(name, password) VALUES($1, $2) RETURNING *', [username, password])
        } catch (err){
            return res.status(500).send("Something went wrong!")
        }
        if (result.length == 1 && username) {
            req.session.signInName = username;
            return res.sendStatus(200);
        } else {
            res.status(404);
            res.contentType("text/urilist");
            return res.send("Make sure to enter a valid username and the fitting password.");
        }

    }

    logOut(req: Request, res: Response): void {
        req.session.destroy(() => {
            res.clearCookie("connect.sid");
            res.sendStatus(200);
        });
    }

    checkLogin(req: Request, res: Response, next: NextFunction) {
        if (req.session.signInName) {
            next()
        } else {
            res.status(401)
        }
    }

}
