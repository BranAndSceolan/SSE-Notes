// Boot express
import {Application, Request, Response} from "express";
import express from "express";
//import cors from "cors"
import {PORT} from "../../index";


const app: Application = express();
app.use(express.json())
//app.use(cors())
app.use(express.urlencoded({
    extended: true
}));

// Application routing
app.use('/', (_req: Request, res: Response) => {
    res.status(200).sendFile("This is sse-notes!")
});

// Start server
app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));

