import express from "express";
import {Application, Request, Response} from "express";
import helmet from "helmet";
import {Pool} from "pg";
import session from "express-session";
import rateLimit from "express-rate-limit"
import csurf from "csurf"
import cookieParser from "cookie-parser"


import {
    notesRouter,
    authRouter,
    strengthRouter
} from "./routes/index"
import crypto from "crypto";
import {printToConsole} from "./modules/util/util";


export const PORT = 8000

// Because the standard typescript type 'Session & Partial<SessionData> does not include the attributes signInId
// and csrfSecret we add them by overwriting express-session
declare module "express-session" {
    interface Session {
        signInId: bigint;
    }
}


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

app.use(cookieParser())

app.use(session({
        resave: true, // save session even if not modified
        saveUninitialized: true, // save session even if not used
        rolling: true, // forces cookie set on every response needed to set expiration
        secret: crypto.randomInt(0, 1000000).toString(), // encrypt session-id in cookie using "secret" as modifier
        name: "myawesomecookie", // name of the cookie set is set by the server
        cookie: {httpOnly: true, maxAge: 15 * 60 * 1000}
    }));

 app.use(csurf({cookie: {httpOnly: true}}))

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

app.get('/api', (req: Request, res: Response) => {
    res.status(200).send({message:"Welcome to SSE-NOTES!",  csrfToken: req.csrfToken()})
});

// Start server
app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
