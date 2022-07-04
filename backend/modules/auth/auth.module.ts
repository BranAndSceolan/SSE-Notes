import {Request, Response} from "express";
import {NextFunction} from "express/ts4.0";
import {client} from "../../index";
import {internalErrorMessage, printError} from "../util/util";


export class AuthModule{
    public async register(req: Request, res: Response) {
        let newUsername : undefined | string = undefined
        let newPassword : undefined | string = undefined
        // check for validity
        if (req.body && req.body.name && typeof req.body.name == "string" && req.body.name.trim()){
            newUsername = req.body.name.trim()
        } else {
            printError("register", "Missing password")
            return res.status(400).send("Name is missing.")
        }
        if (req.body && req.body.password && typeof req.body.password == "string" && req.body.password.trim()){
            newPassword = req.body.password.trim()
        } else {
            printError("register", "Missing password")
          return res.status(400).send("Password is missing.")
        }
        // check if already used&& typeof req.body.password == "string"
        try {
            const result = await client.query('SELECT name FROM users WHERE name like $1', [newUsername])
            if (result.rowCount > 0) {
                printError("register, namecheck", "This name isn't available!")
                return res.status(400).send("This name isn't available!")
            }
        } catch (err){
            printError("register, searching whether name is already in use",err)
            return res.status(500).send(internalErrorMessage)
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
        let username : string | undefined = undefined
        if (req.body && req.body.name && typeof req.body.name == "string" && req.body.name.trim()){
            username = req.body.name.trim()
        } else {
            printError("login", "Username missing")
            return res.status(400).send("Username missing!")
        }
        let password : string | undefined = undefined
        if (req.body && req.body.password && typeof req.body.password == "string" && req.body.password.trim()){
           password = req.body.password.trim()
        } else {
            printError("login", "Password missing!")
            return res.status(400).send("Password missing!")
        }
        let result = undefined
        try {
            result = await client.query('SELECT id FROM users WHERE name like $1 AND password like $2 ', [username, password])
        } catch (err){
            printError("login checking for password and user in Database",err)
            return res.status(500).send(internalErrorMessage)
        }
        if (result.rowCount == 1) {
            req.session.signInId = result.rows[0].id
            return res.status(200).send("Logged in!");
        } else {
            printError("login", "No password and username not found or not fitting.")
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
            printError("checkLogin", "Not logged in, no signInId given.")
            res.status(401).send("not logged in!")
        }
    }

}

