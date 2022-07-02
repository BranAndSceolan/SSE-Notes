import {Request, Response} from "express";
import {printToConsole} from "../util/util";
import {client} from "../../index";
import {CreditedNote} from "../entities/document.entity";

export class DocumentsController {

    public async create(req: Request, res: Response): Promise<void> {
     const authorId : bigint = req.session.signInId
        let insertResult = undefined
        const title : string = req.body.title
        const content : string = req.body.content
        const privacy : string = req.body.private
        if (!title || title.trim() === ""){
            res.status(400).send("Title is missing")
        } else if (!content || content.trim() === ""){
            res.status(400).send("Content is missing")
        } else if (privacy === undefined ){
            res.status(400).send("Privacy level is missing")
        } else {
            try {
                const insertNoteStatement = 'INSERT INTO notes(authorid, title, content, private) VALUES($1, $2, $3, $4) RETURNING *'
                const noteValues = [authorId, title, content, privacy]
                insertResult = await client.query(insertNoteStatement, noteValues)
                if (insertResult?.rowCount == 1){
                    printToConsole("[+] added note: "+ insertResult.rows[0])
                    res.status(201).send("added note")
                } else {
                    printToConsole("Something went wrong while creating a note!")
                    res.status(500).send("something went wrong while creating a note!")
                }
            } catch (e) {
                printToConsole("Had following error while trying inserting note: " + e)
                res.sendStatus(500)
            }
        }
    }

    public async get(req: Request, res: Response): Promise <void> {
        let noteId
        if(req.params.id) {
            noteId = BigInt(req.params.id)
        }
        let result
        if (noteId) {
            try {
               result = await client.query('SELECT * FROM notes INNER JOIN users ON users.id = notes.authorid WHERE $1 = notes.id', [noteId])
            } catch (e) {
                printToConsole("Error while getting specific note: "+ e)
                res.status(500).send("Error while getting note")
            }
            if (result?.rowCount == 1) {
                printToConsole(result.rows[0])
                if (req.session.signInId== result.rows[0]) {
                    res.status(200).send(new CreditedNote(result.rows[0].content, result.rows[0].private, result.rows[0].title, result.rows[0].name))
                } else if (!result.rows[0].private){
                    res.status(200).send(new CreditedNote(result.rows[0].content, result.rows[0].private, result.rows[0].title, result.rows[0].name))
                } else {
                    res.status(403).send("Forbidden")
                }
            }
        } else {

            res.status(400).send("Bad Request")
        }
    }

    public async getList(req: Request, res: Response): Promise<void>{
        let list = undefined
        try {
            list = await client.query('SELECT * FROM notes INNER JOIN users ON notes.authorid = users.id WHERE users.id = $1 OR notes.private = FALSE', [req.session.signInId])
            const notes : CreditedNote[] = []
            for( let i = 0; i < list.rowCount; i++){
                const l = list.rows[i]
                notes.push(new CreditedNote(l.content, l.private, l.title, l.name))
            }

            if (list){
                printToConsole("got results: "+ list)
                printToConsole("as array: "+ notes)
                res.status(200).send(notes)
            }
        } catch (e) {
            printToConsole("Error while trying to fetch list: "+ e)
            res.status(500).send("Internal Server Error")
        }

    }

    public async update(req: Request, res: Response): Promise<void> {
        let updated = undefined
        const query = 'UPDATE notes SET title = $3, content = $4, private = $5 WHERE id = $1 AND authorid = $2 RETURNING *'
        const title = req.body.title
        const privacy = req.body.private
        const content = req.body.content
        if (!title.trim()){
            res.status(400).send("Title missing!")
        } else if (!content.trim()) {
            res.status(400).send("Content missing!")
        }else if (privacy == undefined) {
            res.status(400).send("Privacy level missing!")
        } else {
            try {
                const values = [req.params.id, req.session.signInId, title, content, privacy]
                updated = await client.query(query, values)
            } catch (e) {
                printToConsole("Something went wrong updating a note: "+ e)
                res.sendStatus(500)
            }
            if (updated) {
                res.status(200).send(updated.rows[0])
            }
        }

    }

    public async delete(req: Request, res: Response): Promise<void> {
        let deleted = undefined
        try{
            deleted = await client.query('DELETE FROM notes WHERE id = $1 AND authorid = $2 RETURNING *', [req.params.id, req.session.signInId])
        }catch (e) {
            res.sendStatus(500)
        }
        if (deleted){
            res.status(200).send(deleted.rows[0])
        }

    }
}