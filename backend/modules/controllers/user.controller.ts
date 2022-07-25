import {Request, Response} from "express";
import {pool} from "../../index";
import {internalErrorMessage, printError} from "../util/util";

export class UserController{
    public async update(_req: Request, _res: Response): Promise <void>{
        _res.send(501).send("Not yet implemented")
    }

    public async delete(req: Request, res: Response): Promise<Response> {
            const userId: bigint = req.session.signInId
            let result;
            req.session.destroy(() => {
                res.clearCookie("myawesomecookie");
            });
            try {
                result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId])
            } catch (e) {
                printError("delete user", e)
                return res.status(500).send(internalErrorMessage)
            }
        if (result) {
            return res.status(200).send("user "+ result.rows[0].name + " deleted!")
        } else {
            printError("delete user", "no result from db")
            return res.status(500).send(internalErrorMessage)
        }
    }
}
