import express from "express";
import {Application, Request, Response} from "express";
import helmet from "helmet";
import {Client} from "pg";

import {
    notesRouter,
    authRouter
} from "./routes/index"

export const PORT = 8000


// Verbindung zur Datenbank herstellen

// Boot express
export const app: Application = express();
app.use(express.json())
app.use(helmet())
app.use(express.urlencoded({
    extended: true
}));

declare module "express-session" {
    interface Session {
        signInName: string;
    }
}

export const client = new Client({
    user: 'dbuser',
    host: 'database.server.com',
    database: 'mydb',
    password: 'secretpassword',
    port: 3211,
})
client.connect()
client.query('SELECT NOW()', (err: Error, res: any) => {
    console.log(err, res)
    client.end()
})

// Application routing
app.use('/documents', notesRouter)
app.use('/user', authRouter)

app.get('/', (_req: Request, res: Response) => {
    res.status(200).send("Welcome to SSE-NOTES!")
});

// Start server
app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
