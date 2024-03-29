import {Request, Response} from "express";
import {internalErrorMessage, printError, printToConsole} from "../util/util";
import {pool} from "../../index";
import {CreditedNote} from "../entities/document.entity";
import sanitizeHtml from 'sanitize-html';

export class DocumentsController {
    postgreSqlTrueStrings = ["TRUE", "T", "YES", "Y", "ON", "1"]
    postgreSqlFalseStrings = ["FALSE", "F", "NO", "N", "OFF", "0"]
    postgreSqlTruthStrings = this.postgreSqlTrueStrings.concat(this.postgreSqlFalseStrings)

    public async create(req: Request, res: Response): Promise<Response> {
        const authorId: bigint = req.session.signInId
        let insertResult = undefined
        let title: string | undefined = undefined
        let content: string | undefined = undefined
        let hidden: string | number | boolean | undefined = undefined

        if (req.body.title && typeof req.body.title == "string" && (title = req.body.title.trim())) {
        } else {
            printError("create Note", "Title is missing")
            return res.status(400).send("Title is missing")
        }

        if (req.body.content && typeof req.body.content == "string" && (content = req.body.content.trim())) {
        } else {
            printError("create Note", "Content is missing")
            return res.status(400).send("Content is missing")
        }
        content = sanitizeHtml(content)
        printToConsole(content)
        if ((typeof req.body.hidden == "string" && this.postgreSqlTruthStrings.includes(req.body.hidden.toUpperCase())) ||(typeof req.body.hidden == "boolean") || (typeof req.body.hidden == "number" &&(req.body.hidden == 0 || req.body.hidden == 1)) ){
           hidden = req.body.hidden
        } else {
            printError("create Note", "Privacy flag is missing or invalid")
            return res.status(400).send("Privacy flag is missing or invalid")
        }

        try {
            const insertNoteStatement = 'INSERT INTO notes(authorid, title, content, hidden) VALUES($1, $2, $3, $4) RETURNING *'
            const noteValues = [authorId, title, content, hidden]
            insertResult = await pool.query(insertNoteStatement, noteValues)
            if (insertResult?.rowCount == 1) {
                printToConsole("[+] added note with id: " + insertResult.rows[0].id)
                return res.status(201).send(insertResult.rows[0])
            } else {
                printToConsole("Something went wrong while creating a note!")
                return res.status(500).send(internalErrorMessage)
            }
        } catch (e) {
            printToConsole("Had following error while trying inserting note: " + e)
            return res.status(500).send(internalErrorMessage)
        }
    }

    public async get(req: Request, res: Response): Promise<void> {
        const noteId = req.params.id
        let result
        if (noteId) {
            try {
                result = await pool.query('SELECT content, hidden, title, name, notes.id AS id, notes.authorid AS aid FROM notes INNER JOIN users ON users.id = notes.authorid WHERE $1 = notes.id', [noteId])
            } catch (e) {
                printToConsole("Error while getting specific note: " + e)
                res.status(500).send(internalErrorMessage)
            }
            if (result?.rowCount == 1) {
                const note = result.rows[0]
                if (!note.hidden) {
                    res.status(200).send(new CreditedNote(note.content, note.hidden, note.title, note.name, note.id))
                } else {
                    if (req.session.signInId == note.aid) {
                        res.status(200).send(new CreditedNote(note.content, note.hidden, note.title, note.name, note.id))
                    } else {
                        printError("get note", "Tried to get private note from other user \n aid: " + note.aid + " sessionid: " + req.session.signInId)
                        res.status(404).send("This note either doesn't exist or isn't your own.")
                    }
                }
            } else {
                printError("get note", "no result from db")
                res.status(404).send("This note either doesn't exist or isn't your own.");
            }
        } else {
            res.status(400).send()
        }
    }

    public async getList(req: Request, res: Response): Promise<Response> {
        let list = undefined
        try {
            list = await pool.query('SELECT content, hidden, title, name, notes.id AS id FROM notes INNER JOIN users ON notes.authorid = users.id WHERE users.id = $1 OR notes.hidden = FALSE', [req.session.signInId])
            const notes: CreditedNote[] = []
            for (let i = 0; i < list.rowCount; i++) {
                const l = list.rows[i]
                notes.push(new CreditedNote(l.content, l.hidden, l.title, l.name, l.id))
            }
            return res.status(200).send(notes)
        } catch (e) {
            printToConsole("Error while trying to fetch list: " + e)
            return res.status(500).send(internalErrorMessage)
        }

    }

    public async update(req: Request, res: Response): Promise<Response> {
        let updated = undefined
        const query = 'UPDATE notes SET title = $3, content = $4, hidden = $5 WHERE id = $1 AND authorid = $2 RETURNING *'
        let title: string | undefined = undefined
        let content: string | undefined = undefined
        let hidden: string | number | boolean | undefined = undefined
        if (req.body && req.body.title && typeof req.body.title == "string" && (title = req.body.title.trim())) {
        } else {
            printError("update note", "Title missing")
            return res.status(400).send("Title missing!")
        }

        if (req.body.content && typeof req.body.content == "string" && (content = req.body.content.trim())) {
        } else {
            printError("update note", "Content missing")
            return res.status(400).send("Content missing!")
        }
        content = sanitizeHtml(content)
        if ((typeof req.body.hidden == "string" && this.postgreSqlTruthStrings.includes(req.body.hidden.toUpperCase())) ||(typeof req.body.hidden == "boolean") || (typeof req.body.hidden == "number" &&(req.body.hidden == 0 || req.body.hidden == 1))){
            hidden = req.body.hidden
        } else {
            printError("Update Note", "Privacy flag is missing or invalid")
            return res.status(400).send("Privacy flag is missing or invalid")
        }

        try {
            updated = await pool.query(query, [req.params.id, req.session.signInId, title, content, hidden])
        } catch (e) {
            printToConsole("Something went wrong updating a note: " + e)
            return res.status(500).send(internalErrorMessage)
        }
        if (updated.rowCount == 1) {
            return res.status(200).send();
        } else {
            printError("update Note", "no result from db")
            return res.status(404).send("This note either doesn't exist or isn't your own.")
        }

    }

    public async search(req: Request, res: Response): Promise<Response> {
        let searchValues: string;
        let searchResult = undefined
        if (req && req.params && req.params.search && (searchValues = req.params.search)) {
            try {
                    searchResult = await pool.query("SELECT content, hidden, title, name, notes.id AS id FROM notes INNER JOIN users ON notes.authorid = users.id WHERE hidden=FALSE AND (title LIKE '%' || $1 || '%' OR content LIKE '%' || $1 || '%' OR name LIKE '%' || $1 || '%') UNION SELECT content, hidden, title, name, notes.id AS id FROM notes INNER JOIN users ON notes.authorid = users.id WHERE hidden=TRUE AND notes.authorid=$2 AND (title LIKE '%' || $1 || '%' OR content LIKE '%' || $1 || '%' OR name LIKE '%' || $1 || '%')", [searchValues, req.session.signInId])
            } catch (e) {
                printError("Search Notes", e)
                return res.status(500).send(internalErrorMessage)
            }
            if (searchResult.rows) {
                const notes: CreditedNote[] = []
                for( let i = 0; i < searchResult.rowCount; i++){
                    const l = searchResult.rows[i]
                    notes.push(new CreditedNote(l.content, l.hidden, l.title, l.name, l.id))
                }
                return res.status(200).send(notes)
            } else {
                return res.status(500).send(internalErrorMessage)
            }
        } else {
            return res.status(400).send("No search parameter.")
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        let deleted = undefined
        try {
            deleted = await pool.query('DELETE FROM notes WHERE id = $1 AND authorid = $2 RETURNING *', [req.params.id, req.session.signInId])
        } catch (e) {
            printError("Delete Note", e)
            return res.status(500).send(internalErrorMessage)
        }
        if (deleted.rowCount == 1) {
            return res.status(200).send();
        } else {
            return res.status(404).send("This note either doesn't exist or isn't your own.")
        }
    }
}