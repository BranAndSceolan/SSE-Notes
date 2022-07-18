import express from "express";
import {Application, Request, Response} from "express";
import helmet from "helmet";
import {Client} from "pg";
import session from "express-session";
import csurf from "csurf"
import cookieParser from "cookie-parser"

import {
    notesRouter,
    authRouter, strengthRouter
} from "./routes/index"
import crypto from "crypto";
import { printToConsole} from "./modules/util/util";
import config from "config";

export const PORT = 8000


// Verbindung zur Datenbank herstellen

// Boot express
export const app: Application = express();
app.use(express.json())
app.use(helmet())
app.use(express.urlencoded({
    extended: true
}));

if (config.get("auth") == true) {
    app.use(cookieParser())

    app.use(session({
        resave: true, // save session even if not modified
        saveUninitialized: true, // save session even if not used
        rolling: true, // forces cookie set on every response needed to set expiration
        secret: crypto.randomInt(0, 1000000).toString(), // encrypt session-id in cookie using "secret" as modifier
        name: "myawesomecookie", // name of the cookie set is set by the server
        cookie: {secure: true, maxAge: 15*60*1000}, //enable this as soon as https-certificates are included, and we use https for our messages
        // only then will this application be secure!
    }));
    // protect against cross site request forgery
    app.use(csurf({ cookie: true }));
} else {
    app.use(session({
        resave: true, // save session even if not modified
        saveUninitialized: true, // save session even if not used
        rolling: true, // forces cookie set on every response needed to set expiration
        secret: crypto.randomInt(0, 1000000).toString(), // encrypt session-id in cookie using "secret" as modifier
        name: "myawesomecookie", // name of the cookie set is set by the server
        cookie: {maxAge: 15*60*1000}, //enable this as soon as https-certificates are included, and we use https for our messages
        // only then will this application be secure!
    }));
}

declare module "express-session" {
    interface Session {
        signInId: bigint;
    }
}
export const client = new Client({
    user: process.env.NOTES_USER,
    host: 'localhost',
    database: process.env.POSTGRES_DB,
    password: process.env.NOTES_PASSWORD,
    port: 5432,
})

client.connect()
client.query('SELECT NOW()', (err: Error, res: any) => {
    printToConsole("Error? " + err + " | Time: " + res.rows[0].now)
    // client.end() Don't disconnect yet!
})


// Application routing
app.use('/api/documents', notesRouter)
app.use('/api/user', authRouter)
app.use('/api/strength', strengthRouter)

app.get('/api', (_req: Request, res: Response) => {
    res.status(200).send("Welcome to SSE-NOTES!")
});

// Start server
app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
