import express from "express";
import {Application, Request, Response} from "express";
import helmet from "helmet";
import {Pool} from "pg";
import session from "express-session";


import {
    notesRouter,
    authRouter,
    strengthRouter
} from "./routes/index"
import crypto from "crypto";
import {printToConsole} from "./modules/util/util";
import config from "config";
import rateLimit from "express-rate-limit"


export const PORT = 8000


// Verbindung zur Datenbank herstellen

// Boot express
export const app: Application = express();
app.use(express.json())
app.use(helmet())
app.use(express.urlencoded({
    extended: true
}));

const rateLimitOptions = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 60, // Limit each IP to 5 requests per `window` (here, per 1 minute)
    standardHeaders: false, // Do not return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false,
})


if (config.get("debug")) {
    app.use(session({
        resave: true, // save session even if not modified
        saveUninitialized: true, // save session even if not used
        rolling: true, // forces cookie set on every response needed to set expiration
        secret: crypto.randomInt(0, 1000000).toString(), // encrypt session-id in cookie using "secret" as modifier
        name: "myawesomecookie", // name of the cookie set is set by the server
        cookie: {maxAge: 15 * 60 * 1000}
    }));
} else {
    app.use(session({
        resave: true, // save session even if not modified
        saveUninitialized: true, // save session even if not used
        rolling: true, // forces cookie set on every response needed to set expiration
        secret: crypto.randomInt(0, 1000000).toString(), // encrypt session-id in cookie using "secret" as modifier
        name: "myawesomecookie", // name of the cookie set is set by the server
        cookie: {secure: true, httpOnly: true, maxAge: 15 * 60 * 1000}
    }));
}

declare module "express-session" {
    interface Session {
        signInId: bigint;
    }
}

export const pool = new Pool({
    user: process.env.NOTES_USER,
    host: process.env.NOTES_DB_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.NOTES_PASSWORD,
    port: 5432,
})


pool.query('SELECT NOW()', (err: Error, res: any) => {
    if (err){
    printToConsole("Error? " + err  )
    }
    if (res && res.rows && res.rows[0]){
        printToConsole("Time " + res.rows[0].now)
    }
})


app.use(rateLimitOptions)


// Application routing
app.use('/api/documents', notesRouter)
app.use('/api/user', authRouter)
app.use('/api/strength', strengthRouter)

app.get('/api', (_req: Request, res: Response) => {
    res.status(200).send("Welcome to SSE-NOTES!")
});

// Start server
app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
