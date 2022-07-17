import {Request, Response} from "express";
import {NextFunction} from "express/ts4.0";
import {client} from "../../index";
import zxcvbn from "zxcvbn";
import {internalErrorMessage, printError, printToConsole} from "../util/util";
import argon2, {argon2id} from "argon2";

export class AuthModule{
    public async register(req: Request, res: Response): Promise<Response> {
        let newUsername : undefined | string = undefined
        let newPassword : undefined | string = undefined
        // check for validity
        if (req.body && req.body.name && typeof req.body.name == "string" && (newUsername = req.body.name.trim())){
        } else {
            printError("register", "Missing name")
            return res.status(400).send("Username is missing!")
        }
        if (req.body.password && typeof req.body.password == "string" && (newPassword = req.body.password.trim())){
        } else {
            printError("register", "Missing password")
          return res.status(400).send("Password is missing!")
        }
        // check if password is good enough
        let result : zxcvbn.ZXCVBNResult
        result = zxcvbn(newPassword)
        if (result.score < 3) {
            printError("register, checking Password", result.feedback.suggestions.toString())
            // for some reason, zxcvbn sometimes ends up with ,. in strings. Replace ,. for better readability
            return res.status(400).send("Password too weak! "
                + result.feedback.suggestions.toString().replace(/\.,/g, '. ') + "\n "
                + result.feedback.warning.toString().replace(/\.,/g, '.'))
        }
        // check if name is already used
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
        // hash password using argon2id
        // using 64 MB of memory (memoryCost is given in KB), 1 degree of parallelism and 3 iterations, which is
        // more than the minimum of 15MiB memory, 1 degree of parallelism and 2 iterations OWASP recommends
        // node-agron2 sets its own salt randomly and saves it with the hash
        const hash = await argon2.hash(newPassword, {
            type : argon2id,
            memoryCost: 2 ** 16,
            hashLength: 50,
        })
        printToConsole(hash)
        try {
            const result = await client.query('INSERT INTO users(name, password) VALUES($1, $2) RETURNING *', [newUsername, hash])
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

    public async login(req: Request, res: Response): Promise<Response>{
        let username : string | undefined = undefined
        if (req.body && req.body.name && typeof req.body.name == "string" && (username = req.body.name.trim())){
        } else {
            printError("login", "Username is missing")
            return res.status(400).send("Username is missing")
        }
        let password : string | undefined = undefined
        if (req.body.password && typeof req.body.password == "string" && (password = req.body.password.trim())){
        } else {
            printError("login", "Password is missing!")
            return res.status(400).send("Password is missing")
        }
        let result = undefined
        try {
            // cheap validation first: password gets only hashed if it is affirmed that there is a user with the given name
            result = await client.query('SELECT * FROM users WHERE name like $1', [username])
        } catch (err){
            printError("login checking for password and user in Database",err)
            return res.status(500).send(internalErrorMessage)
        }
        if (result.rowCount == 1) {
            try {
                if (await argon2.verify(result.rows[0].password, password)) {
                    req.session.signInId = result.rows[0].id
                    return res.status(200).send("Logged in!");
                } else {
                    printError("login", "No password and username not found or not fitting.")
                    res.status(400);
                    return res.send("Make sure to enter a valid username and the correct password.");
                }
            } catch (err) {
                printError("at login, verify password hash", err)
                return res.status(500).send(internalErrorMessage)// internal failure
            }
        } else {
            printError("login", "No password and username not found or not fitting.")
            res.status(400);
            return res.send("Make sure to enter a valid username and the correct password.");
        }

    }

    public logOut(req: Request, res: Response): void {
        req.session.destroy(() => {
            res.clearCookie("myawesomecookie");
            res.sendStatus(200);
        });
    }

    public checkLogin(req: Request, res: Response, next: NextFunction) : void {
        if (req.session.signInId) {
            next()
        } else {
            printError("checkLogin", "Not logged in, no signInId given.")
            res.status(401).send("not logged in!")
        }
    }

}

