import express from "express";
import {Application, Request, Response} from "express";
import helmet from "helmet";
import genuuid from 'uid-safe'
import * as Express from "express";
import * as ExpressSession from "express-session";

export const PORT = 8000

import {
    notesRouter,
    authRouter
} from "./routes/index"

// Verbindung zur Datenbank herstellen

// Boot express
export const app: Application = express();
app.use(express.json())
app.use(helmet())
app.use(express.urlencoded({
    extended: true
}));

export interface myRequest extends Express.Request { session: [any];}

const instance = Express();

instance.use(ExpressSession({
    secret: "help!!!",
    resave: false,
    saveUninitialized: true
}));



// Application routing
app.use('/documents', notesRouter)
app.use('/user', authRouter)

app.get('/', (_req: Request, res: Response) => {
    res.status(200).send("Welcome to SSE-NOTES!")
});

// Start server
app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
