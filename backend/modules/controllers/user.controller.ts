import {Request, Response} from "express";
import {client} from "../../index";

export class UserController{
    public async update(_req: Request, _res: Response): Promise <void>{
        _res.send(501).send("Not yet implemented")
    }
    public async delete(req: Request, res: Response): Promise<void> {
            const userId: bigint = req.session.signInId
            try {
                let result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId])
                if (result) {
                    res.status(200).send("user "+ result.rows[0] + " deleted!")
                } else {
                    res.status(400).send("Error deleting user")
                }
            } catch (e) {
                res.status(500).send("Error while deleting user"+ e)
            }
    }
}
