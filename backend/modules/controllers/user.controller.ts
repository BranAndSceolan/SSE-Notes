import {Request, Response} from "express";
import {client} from "../../index";
import {internalErrorMessage, printError} from "../util/util";

export class UserController{
    public async update(_req: Request, _res: Response): Promise <void>{
        _res.send(501).send("Not yet implemented")
    }
    public async delete(req: Request, res: Response): Promise<void> {
            const userId: bigint = req.session.signInId
            try {
                let result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId])
                if (result) {
                    res.status(200).send("user "+ result.rows[0].name + " deleted!")
                } else {
                    printError("delete user", "no result from db")
                    res.status(500).send(internalErrorMessage)
                }
            } catch (e) {
                printError("delete user", e)
                res.status(500).send(internalErrorMessage)
            }
    }
}
