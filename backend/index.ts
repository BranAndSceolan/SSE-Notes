import express from "express";
import {Application, Request, Response} from "express";
import helmet from "helmet";
import {Pool} from "pg";
import session from "express-session";

import {
    notesRouter,
    authRouter, strengthRouter
} from "./routes/index"
import crypto from "crypto";
import {printError, printToConsole} from "./modules/util/util";

export const PORT = 8000


// Verbindung zur Datenbank herstellen

// Boot express
export const app: Application = express();
app.use(express.json())
app.use(helmet())
app.use(express.urlencoded({
    extended: true
}));

app.use(session({
    resave: true, // save session even if not modified
    saveUninitialized: true, // save session even if not used
    rolling: true, // forces cookie set on every response needed to set expiration
    secret: crypto.randomInt(0, 1000000).toString(), // encrypt session-id in cookie using "secret" as modifier
    name: "myawesomecookie", // name of the cookie set is set by the server
    //TODO: cookie: {secure: true} //enable this as soon as https-certificates are included and we use https for our messages
    // only then will this application be secure!
    cookie: {maxAge: 15*60*1000}
}));

declare module "express-session" {
    interface Session {
        signInId: bigint;
    }
}

export const pool = new Pool({
    user: "notes",
    host: 'localhost',
    database: process.env.POSTGRES_DB,
    password: process.env.NOTES_PASSWORD,
    port: 5432,
})
pool.on('error', (err, client) => {
    printError("on pooling request", 'Error: ' + err+ " |client "+ client);
});

pool.query('SELECT NOW()', async (err: Error, res: any) => {
    printToConsole("Error? " + err + " | Time: " + res.rows[0].now)
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
