import {Request, Response} from "express";
import {printToConsole} from "../util/util";
import {client} from "../../index";
import {CreditedNote} from "../entities/document.entity";

export class DocumentsController {

    public async create(req: Request, res: Response): Promise<void> {
     const author : string = req.session.signInName
        let resultUser = undefined
        let insertResult = undefined
        const title : string = req.body.title
        const content : string = req.body.content
        const privacy : string = req.body.private
        if (!title || title.trim() === ""){
            res.status(400).send("Title is missing")
        } else if (!content || content.trim() === ""){
            res.status(400).send("Content is missing")
        } else if (!privacy || privacy.trim() === ""){
            res.status(400).send("Privacy level is missing")
        } else {
            try {
                resultUser = await client.query('SELECT id FROM users WHERE name like $1', [author])
                if (resultUser?.rowCount != 1) {
                    printToConsole("failed to find user corresponding to session")
                    res.status(404).send("failed to find user corresponding to session")
                } else {
                    printToConsole(resultUser.rows[0])
                    const authorid = resultUser.rows[0].id
                    const insertNoteStatement = 'INSERT INTO notes(authorid, title, content, private) VALUES($1, $2, $3, $4) RETURNING *'
                    const noteValues = [authorid, title, content, privacy]
                        insertResult = await client.query(insertNoteStatement, noteValues)
                    if (insertResult?.rowCount == 1){
                        printToConsole("[+] added note: "+ insertResult.rows[0])
                        res.status(201).send("added note")
                    } else {
                        printToConsole("Something went wrong while creating a note!")
                        res.status(500).send("something went wrong while creating a note!")
                    }
                }
            } catch (e) {
                printToConsole("Had following error while trying to find user or inserting note: " + e)
                res.sendStatus(500)
            }
        }
    }

    public async get(req: Request, res: Response): Promise <void> {
        const noteId = req.params.id
        if (noteId) {
            try {
                const result = await client.query('SELECT * FROM notes INNER JOIN users ON users.id = notes.authorid WHERE $1 = notes.id', [noteId])
                if (result.rowCount == 1){
                    res.status(200).send(new CreditedNote(result.rows[0].content, result.rows[0].private, result.rows[0].title, result.rows[0].name))
                }
            } catch (e) {
                printToConsole("Error while getting specific note: "+ e)
                res.status(500).send("Error while getting note")
            }
        } else {
            res.status(400).send("Bad Request")
        }
    }

    public getList(req: Request, res: Response): void{
        if (req.params /*valid*/) {
            /* if ( successfully gotten from db){
         send res with status 200 and values as json
         }else{
             send res with status 404
            }*/
        } else {
            res.status(400).send("Bad Request")
        }
    }

    public delete(req: Request, res: Response): void {
        if (req /*valid*/) {
            /* if ( delete from database){
         send res with status 200 and values of deleted note
         }else{
             send res with status 500
            }*/
        } else {
            res.status(400).send("Bad Request")
        }
    }
}