import {Request, Response} from "express";
import {internalErrorMessage, printError, printToConsole} from "../util/util";
import {client} from "../../index";
import {CreditedNote} from "../entities/document.entity";

export class DocumentsController {
    postgreSqlTrueStrings = ["TRUE", "T", "YES", "Y", "ON", "1"]
    postgreSqlFalseStrings = ["FALSE", "F", "NO", "N", "OFF", "0"]
    postgreSqlTruthStrings = this.postgreSqlTrueStrings.concat(this.postgreSqlFalseStrings)

    public async create(req: Request, res: Response): Promise<Response> {
     const authorId : bigint = req.session.signInId
        let insertResult = undefined
        let title : string | undefined = undefined
        let content : string | undefined = undefined
        let privacy : string | number | boolean | undefined = undefined

        if (req.body && req.body.title &&  typeof req.body.title == "string" && req.body.title.trim()) {
            title = req.body.title.trim()
        } else {
            printError("create Note", "Title is missing")
            return res.status(400).send("Title is missing")
        }

        if (req.body.content &&  typeof req.body.content == "string" && req.body.content.trim()) {
            content = req.body.content.trim()
        } else {
            printError("create Note", "Content is missing")
            return res.status(400).send("Content is missing")
        }

        if ((typeof req.body.private == "string" && this.postgreSqlTruthStrings.includes(req.body.private.toUpperCase())) ||(typeof req.body.private == "boolean") || (typeof req.body.private == "number" &&(req.body.private == 0 || req.body.private == 1)) ){
           privacy = req.body.private
        } else {
            printError("create Note", "Privacy level is missing or invalid")
            return res.status(400).send("Privacy level is missing or invalid")
        }

         try {
             const insertNoteStatement = 'INSERT INTO notes(authorid, title, content, private) VALUES($1, $2, $3, $4) RETURNING *'
             const noteValues = [authorId, title, content, privacy]
             insertResult = await client.query(insertNoteStatement, noteValues)
             if (insertResult?.rowCount == 1){
                 printToConsole("[+] added note: "+ insertResult.rows[0])
                 return res.status(201).send(insertResult.rows[0].toString())
             } else {
                 printToConsole("Something went wrong while creating a note!")
                 return res.status(500).send(internalErrorMessage)
             }
         } catch (e) {
             printToConsole("Had following error while trying inserting note: " + e)
             return res.status(500).send(internalErrorMessage)
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
                res.status(500).send(internalErrorMessage)
            }
            if (result?.rowCount == 1) {
                printToConsole(result.rows[0])
                if (req.session.signInId== result.rows[0]) {
                    res.status(200).send(new CreditedNote(result.rows[0].content, result.rows[0].private, result.rows[0].title, result.rows[0].name, result.rows[0].id))
                } else if (result.rows[0].private){
                    if (req.session.signInId == result.rows[0].authorId) {
                        res.status(200).send(new CreditedNote(result.rows[0].content, result.rows[0].private, result.rows[0].title, result.rows[0].name, result.rows[0].id))
                    } else{
                        printError("get note", "Tried to get private note from other user")
                        res.status(403).send("Forbidden")
                    }
                } else {
                    res.status(403).send("Forbidden")
                }
            }
        } else {
            res.status(400).send("Bad Request")
        }
    }

    public async getList(req: Request, res: Response): Promise<Response> {
        let list = undefined
        try {
            list = await client.query('SELECT content, private, title, name, notes.id AS id FROM notes INNER JOIN users ON notes.authorid = users.id WHERE users.id = $1 OR notes.private = FALSE', [req.session.signInId])
            const notes : CreditedNote[] = []
            for( let i = 0; i < list.rowCount; i++){
                const l = list.rows[i]
                notes.push(new CreditedNote(l.content, l.private, l.title, l.name, l.id))
            }
                return res.status(200).send(notes)
        } catch (e) {
            printToConsole("Error while trying to fetch list: "+ e)
            return res.status(500).send(internalErrorMessage)
        }

    }

    public async update(req: Request, res: Response): Promise<Response> {
        let updated = undefined
        const query = 'UPDATE notes SET title = $3, content = $4, private = $5 WHERE id = $1 AND authorid = $2 RETURNING *'
        let title : string | undefined = undefined
        let content : string | undefined = undefined
        let privacy : string | number | boolean | undefined = undefined
        if (req.body && req.body.title && typeof req.body.title == "string" && req.body.title.trim()) {
            title = req.body.title.trim()
        } else{
            printError("update note", "Title missing")
            return res.status(400).send("Title missing!")
        }

        if (req.body.content && typeof req.body.content == "string" && req.body.content.trim()) {
            content = req.body.content.trim()
        } else{
            printError("update note", "Content missing")
            return res.status(400).send("Content missing!")
        }

        if ((typeof req.body.private == "string" && this.postgreSqlTruthStrings.includes(req.body.private.toUpperCase())) ||(typeof req.body.private == "boolean") || (typeof req.body.private == "number" &&(req.body.private == 0 || req.body.private == 1))){
            privacy = req.body.private
        } else {
            printError("Update Note", "Privacy level is missing or invalid")
            return res.status(400).send("Privacy level is missing or invalid")
        }

        try {
            const values = [req.params.id, req.session.signInId, title, content, privacy]
            updated = await client.query(query, values)
        } catch (e) {
            printToConsole("Something went wrong updating a note: "+ e)
            return res.status(500).send(internalErrorMessage)
        }
        if (updated) {
            return res.status(200).send(updated.rows[0])
        } else {
            printError("update Note", "no result from db")
            return res.status(500).send(internalErrorMessage)
        }

    }

    public async delete(req: Request, res: Response): Promise<Response> {
        let deleted = undefined
        try{
            deleted = await client.query('DELETE FROM notes WHERE id = $1 AND authorid = $2 RETURNING *', [req.params.id, req.session.signInId])
        }catch (e) {
            printError("Delete Note", e)
            return res.status(500).send(internalErrorMessage)
        }
        if (deleted){
            return res.status(200).send(deleted.rows[0])
        } else{
            printError("delete Note", "no result from db")
            return res.status(500).send(internalErrorMessage)
        }

    }
}