import {Request, Response} from "express";
import {NextFunction} from "express/ts4.0";
import {client} from "../../index";
import {internalErrorMessage, printError} from "../util/util";


export class AuthModule{
    public async register(req: Request, res: Response) {
        let newUsername : undefined | string = undefined
        let newPassword : undefined | string = undefined
        // check for validity
        if (req.body.name && req.body.name.trim){
            newUsername = req.body.name.trim()
        } else {
            printError("register", "Missing password")
            res.status(400).send("Name is missing.")
        }
        if (req.body.password && req.body.password.trim()){
            newPassword = req.body.password.trim()
        } else {
            printError("register", "Missing password")
            res.send(400).send("Password is missing.")
        }
        // check if already used
        try {
            const result = await client.query('SELECT name FROM users WHERE name like $1', [newUsername])
            if (result.rowCount > 0) {
                printError("register, namecheck", "This name isn't available!")
                return res.sendStatus(400).send("This name isn't available!")
            }
        } catch (err){
            printError("register, searching whether name is already in use",err)
            return res.status(500).send("Something went wrong registering!")
        }

        try {
            const result = await client.query('INSERT INTO users(name, password) VALUES($1, $2) RETURNING *', [newUsername, newPassword])
            if (result.rowCount == 1){
                req.session.signInId = result.rows[0].id
                return res.status(200).send("Congratulations! You are now registered!")
            } else {
                printError("register, inserting user into db", "no return values from db")
                return res.status(500).send(internalErrorMessage)
            }
        } catch (err) {
            printError("register, inserting user values into db", err)
            return res.status(500).send(internalErrorMessage)
        }
    }

    async login(req: Request, res: Response) {
        let username : string | undefined = req.body.name.trim()
        let password : string | undefined = req.body.password.trim()
        let result = undefined
        try {
            result = await client.query('SELECT id FROM users WHERE name like $1 AND password like $2 ', [username, password])
        } catch (err){
            console.log(err)
            return res.status(500).send("Something went wrong!")
        }
        if (result.rowCount == 1) {
            req.session.signInId = result.rows[0].id
            return res.status(200).send("Logged in!");
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
        if (req.session.signInId) {
            next()
        } else {
            res.status(401).send("not logged in!")
        }
    }

}

